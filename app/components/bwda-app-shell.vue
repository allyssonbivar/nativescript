<template>
  <Page class="page">
    <ActionBar :title="title" class="action-bar">
      <ActionItem @tap="$refs.drawer.nativeView.showDrawer()">
        <Label text.decode="&#xf039;" class="action-bar-icon action-item"/>
      </ActionItem>
    </ActionBar>
    <GridLayout rows="*">
      <RadSideDrawer ref="drawer">
        <StackLayout ~drawerContent class="side-drawer-background">
          <ScrollView>
            <StackLayout class="side-drawer-menu">
              <Image class="side-drawer-img-resize" src="~/assets/BWDA5.png"/>
              <Button class="side-drawer-first-button" text="Início" @tap="$navigateTo('M00200LandingDashboard')"/>
              <Button text="Sincronizar com o servidor" @tap="sincroniza"/>
              <Button
                :isEnabled="listaos && listaos.length > 0"
                text="O.S pendentes"
                @tap="$navigateTo('M00500ListagemPrioritaria')"
              />
              <Button
                :isEnabled="osaberta!=null"
                text="Continuar O.S. aberta"
                @tap="$navigateTo('M00600DetalheOS')"
              />
              <Button :isEnabled="osaberta!=null" text="Fechar O.S. aberta" @tap="fechaOS"/>
              <Button class="side-drawer-button-logout" text="Fazer Logout" @tap="fazlogout"/>
              <Label :text="env"/>
              <Label :text="ver"/>
            </StackLayout>
          </ScrollView>
        </StackLayout>
        <StackLayout ~mainContent>
          <slot/>
        </StackLayout>
      </RadSideDrawer>
    </GridLayout>
  </Page>
</template>

<script>
import { File } from "tns-core-modules/file-system";
import Promise from "bluebird";
import { mapState } from "vuex";
import {
  os_service,
  auth_service,
  media_service,
  atividade_service,
  status_atividade_service,
  checklist_item_resposta_service,
  media_checklist_item_resposta_service,
  evento_auditoria_service
} from "../api";
import { version } from "../../package.json";
export default {
  name: "bwda-app-shell",
  data: _ => ({
    env: process.env.NODE_ENV,
    ver: version,
    x:1 
  }),
  computed: mapState([
    "title",
    "auth",
    "osaberta",
    "listaos",
    "listaosconcluida",
    "eventosauditoria"
  ]),
  methods: {
    sincroniza() {
      this.sincroniza_envia()
        .then(this.sincroniza_recebe)
        .then(this.enviaEventosAuditoria)
        .then(_ => alert("OS's atualizadas com sucesso!"))
        .catch(err => {
          console.log(err);
          alert("Não foi possível sincronizar as OS's");
        });
    },
    sincroniza_envia() {
      // FIXME isso funciona mas é meio tenso pra manter.
      return Promise.each(this.listaosconcluida, os => {
        return Promise.each(os.checklist, ch => {
          return Promise.each(ch.checklist_item, item => {
            return Promise.each(item.checklist_item_resposta, resp => {
              // envia as respostas de item de checklist
              console.log("salvando resposta");
              const {
                checklist_item_resposta_id,
                checklist_item_resposta_valor,
                checklist_item_resposta_dtresposta,
                checklist_item_resposta_selecionado
              } = resp;
              return checklist_item_resposta_service
                .save({
                  checklist_item_resposta_id,
                  checklist_item_resposta_valor,
                  checklist_item_resposta_dtresposta,
                  checklist_item_resposta_selecionado
                })
                .then(ret => {
                  // make sure we have id now
                  resp.checklist_item_resposta_id =
                    ret.data.checklist_item_resposta_id;
                  return Promise.each(
                    resp.media_checklist_item_resposta,
                    media => {
                      // console.log(media)
                      if (!media.media_id) {
                        const file = File.fromPath(media.media_url);
                        console.log(file.readSync());
                        if (media.media_url.toLowerCase().endsWith("jpg"))
                          file.type = "image/jpeg";
                        // console.log(file);
                        return media_service.upload(file).then(ret => {
                          media.media_id = ret.content.toJSON().media_id;
                          return media_checklist_item_resposta_service.save({
                            media_id: media.media_id,
                            checklist_item_resposta_id:
                              resp.checklist_item_resposta_id
                          });
                        });
                      }
                    }
                  );
                });
            });
          });
        })
          .then(_ => {
            return Promise.each(os.atividade, ativ => {
              console.log("salvando atividade");
              const {
                atividade_id,
                status_atividade_id,
                atividade_dtresposta
              } = ativ;
              return atividade_service.save({
                atividade_id,
                status_atividade_id,
                atividade_dtresposta
              });
            });
          })
          .then(_ => {
            // salvando o novo status da OS: concluída
            console.log("salvando OS");
            const {
              ordem_servico_id,
              ordem_servico_latitude,
              ordem_servico_longitude
            } = os;
            return os_service.save({
              ordem_servico_id,
              status_ordem_servico_id: 5, // realizada
              ordem_servico_latitude,
              ordem_servico_longitude
            });
          });
      }).then(_ => {
        this.$store.commit("setListaOSConcluida", []);
      });
    },
    sincroniza_recebe() {
      // TODO: fazer a job de segundo plano
      return os_service
        .sincroniza({
          membro_equipe_id: this.auth.pessoa.pessoa_id
        })
        .then(ret => {
          this.$store.commit("setListaOS", ret.data);
          return status_atividade_service.list({ pageSize: 100 });
        })
        .then(ret => {
          this.$store.commit("setListaStatusAtividades", ret.data);
        })
        .then(ret => {
          this.$navigateTo("M00200LandingDashboard", { clearHistory: true });
        });
    },
    fechaOS() {
      confirm("Deseja realmente fazer uma pausa nesta OS?").then(ok => {
        if (ok) {
          this.listaos.unshift(this.osaberta);
          this.$store.commit("setListaOS", this.listaos);
          this.$store.commit("setOSAberta", null);
          this.$navigateTo("M00200LandingDashboard", { clearHistory: true });
        }
      });
    },
    fazlogout() {
      confirm(
        "Deseja realmente fazer logout? ATENÇÃO: ao fazer logout os dados sincronizados são excluídos!"
      ).then(ok => {
        if (ok) {
          console.log("logout...");
          this.$store.dispatch("limpaStore").then(_ => {
            this.$navigateTo("M00100Login", { clearHistory: true });
          });
        }
      });
    },
    enviaEventosAuditoria() {
      return Promise.each(this.eventosauditoria, evento => {
        return evento_auditoria_service.save(evento);
      }).then(_ => {
        this.$store.commit("setEventoAuditoria", []);
      });
    }
  }
};
</script>
