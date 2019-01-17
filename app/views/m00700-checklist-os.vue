<template>
  <bwda-app-shell>
    <GridLayout rows="auto,*">
      <FlexboxLayout justifyContent="space-around" row="0">
        <Button class="btn btn-primary checklist-os-button" v-if="temAnterior" @tap="prev">Anterior</Button>
        <Button class="btn btn-primary checklist-os-button" @tap="leave">Voltar Para a OS</Button>
        <Button class="btn btn-primary checklist-os-button" v-if="temProxima" @tap="next">Próximo</Button>
      </FlexboxLayout>
      <ScrollView row="1">
        <StackLayout class="checklist-os-form">
          <Label text="Detalhes de checklist"/>
          <bwda-checklist-item
            v-for="i in checklist.checklist_item"
            :key="i.checklist_item_id"
            :checklist-item="i"
          />
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </bwda-app-shell>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "m00700-checklist-os",
  computed: {
    ...mapState(["title", "id_checklist_aberto", "osaberta"]),
    temAnterior() {
      return this.osaberta.checklist.indexOf(this.checklist) > 0;
    },
    temProxima() {
      return (
        this.osaberta.checklist.indexOf(this.checklist) <
        this.osaberta.checklist.length - 1
      );
    }
  },
  data: _ => ({ checklist: { checklist_item: [] } }),
  mounted() {
    this.checklist = this.osaberta.checklist.find(
      e => e.checklist_id == this.id_checklist_aberto
    );
    this.$store.commit(
      "setTitle",
      `OS #${this.osaberta.ordem_servico_id} - Checklist #${
        this.checklist.checklist_id
      }: ${this.checklist.checklist_descricao}`
    );
  },
  // TODO clean this workflow
  methods: {
    doleave() {
      // salva pra não perder o que já tem respondido
      this.$store.commit("setOSAberta", this.osaberta);
      this.$navigateTo("M00600DetalheOS");
      console.log(this) ;
    },
    leave() {
      if (!this.checklist.respondido) {
        confirm("Salvar datas de resposta dos itens?").then(ok => {
          if (ok) {
            this.checklist.checklist_item.map(i => {
              i.checklist_item_resposta.map(r => {
                r.checklist_item_resposta_dtresposta = new Date();
              });
            });
            this.checklist.respondido = true;
            this.doleave();
          }
        });
      } else this.doleave();
    },
    doprev() {
      const idx = this.osaberta.checklist.indexOf(this.checklist);
      const prevcheck = this.osaberta.checklist[idx - 1];
      this.$store.commit("setIdChecklistAberto", prevcheck.checklist_id);
      this.$navigateTo("M00700ChecklistOS");
    },
    prev() {
      if (!this.checklist.respondido) {
        confirm("Salvar datas de resposta dos itens?").then(ok => {
          if (ok) {
            this.checklist.checklist_item.map(i => {
              i.checklist_item_resposta.map(r => {
                r.checklist_item_resposta_dtresposta = new Date();
              });
            });
            this.checklist.respondido = true;
            this.doprev();
          }
        });
      } else this.doprev();
    },
    donext() {
      const idx = this.osaberta.checklist.indexOf(this.checklist);
      const nextcheck = this.osaberta.checklist[idx + 1];

      this.$store.commit("setIdChecklistAberto", nextcheck.checklist_id);
      this.$navigateTo("M00700ChecklistOS");
    },
    next() {
      if (!this.checklist.respondido) {
        confirm("Salvar datas de resposta dos itens?").then(ok => {
          if (ok) {
            this.checklist.checklist_item.map(i => {
              i.checklist_item_resposta.map(r => {
                r.checklist_item_resposta_dtresposta = new Date();
              });
            });
            this.checklist.respondido = true;
            this.donext();
          }
        });
      } else this.donext();
    }
  }
};
</script>
