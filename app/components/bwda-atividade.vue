<template>
  <FlexboxLayout @tap="e => $emit('tap', e)">
    <TextView width="70%" :text="atividade.atividade_descricao" editable="false"/>
    <Button width="30%" :text="statusativ" @tap="changestatus" :class="classestatusatividade"/>
  </FlexboxLayout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "bwda-atividade",
  props: ["atividade", "os"],
  computed: {
    ...mapState(["listaStatusAtividades"]),
    statusativ() {
      return (
        (this.atividade.status_atividade &&
          this.atividade.status_atividade.status_atividade_descricao) ||
        "---"
      );
    },
    classestatusatividade() {
      return {
        btn: true,
       'btn-primary': this.atividade.status_atividade_id === 1,
       'btn-green': this.atividade.status_atividade_id === 2,
       'btn-red': this.atividade.status_atividade_id === 3,
       'btn-orange': this.atividade.status_atividade_id === 4,
      }
    },
  },
  methods: {
    changestatus() {
      action(
        "Status da Atividade",
        "Cancelar",
        this.listaStatusAtividades.map(e => e.status_atividade_descricao)
      ).then(ret => {
        const status = this.listaStatusAtividades.find(
          e => e.status_atividade_descricao == ret
        );
        this.atividade.status_atividade = status;
        this.atividade.status_atividade_id = status.status_atividade_id;
        this.atividade.atividade_dtresposta = new Date()
        // será que tá por referência?
        this.$store.commit("setOSAberta", this.os);
      });
    }
  }
};
</script>

<style>
</style>
