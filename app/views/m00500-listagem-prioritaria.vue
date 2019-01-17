<template>
  <bwda-app-shell>
    <GridLayout v-if="listaos.length" rows="*" columns="*">
      <Scrollview>
        <ListView for="itemos in listaos" separatorColor="transparent">
          <v-template>
            <CardView class="landing-dashboard-first-card" margin="10" elevation="10" radius="1">
              <bwda-resumo-os class="listagem-prioritaria-os-card" :os="itemos" @tap="abreOS(itemos)"/>
            </CardView>
          </v-template>
        </ListView>
      </Scrollview>
    </GridLayout>
  </bwda-app-shell>
</template>

<script>
import { mapState } from "vuex";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import moment from "moment";

const ModalLoading = {
  computed: mapState(["osaberta"]),
  mounted() {
    geolocation
      .getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        maximumAge: 5000,
        timeout: 30000
      })
      .then(res => {
        this.osaberta.ordem_servico_longitude = res.longitude;
        this.osaberta.ordem_servico_latitude = res.latitude;
        this.$store.commit("setOSAberta", this.osaberta);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(_ => {
        this.$modal.close();
      });
  },
  template: `
    <Page>
      <StackLayout>
        <ActivityIndicator :busy="true"/>
      </StackLayout>
    </Page>
  `
};

export default {
  name: "m00500-listagem-prioritaria",
  data: _ => ({loading: ModalLoading}),
  computed: mapState(["auth", "listaos", "osaberta",  "eventosauditoria"]),
  mounted() {
    this.$store.commit("setTitle", `${this.listaos.length} OS para executar`);
    geolocation.enableLocationRequest();
  },
  methods: {
    abreOS(itemos) {
      confirm(
        "Atenção: Ao selecionar uma OS ela será marcada como aberta! Deseja continuar?"
      ).then(ok => {
        if (ok) {
          const relogio = new Date().toJSON();
          const data = moment(relogio).format("DD/MM/YYYY");
          const hora = moment(relogio).format("HH:mm");
          if (this.osaberta) {
            // guardando os aberta anterior
            this.listaos.unshift(this.osaberta);
            this.$store.commit("setListaOS", this.listaos);

            this.$store.dispatch("criaEvento", {
            tipo_evento_auditoria_id: 25, 
            pessoa_id: this.auth.pessoa.pessoa_id,
            evento_auditoria_dado_antigo: "",
            evento_auditoria_dado_novo: `Coloca OS ${this.osaberta.ordem_servico_id} em pausa em ${data} ás ${hora}`
          });
          }

          this.$store.dispatch("criaEvento", {
            tipo_evento_auditoria_id: 26,
            pessoa_id: this.auth.pessoa.pessoa_id,
            evento_auditoria_dado_antigo: "",
            evento_auditoria_dado_novo: `Resume OS ${itemos.ordem_servico_id} em ${data} ás ${hora}`
          });
          this.$store.commit("setOSAberta", itemos);

          this.$showModal(this.loading)
            .then(res => {
              const lista = this.listaos.filter(e => e != itemos);
              this.$store.commit("setListaOS", lista);
              this.$navigateTo("M00600DetalheOS");
            });
        }
      });
    }
  }
};
</script>
