<template>
  <FlexboxLayout @tap="e => $emit('tap', e)">
    <TextView width="35%" :text="checklist.checklist_descricao" editable="false"></TextView>
    <TextView width="35%" :text="`${checklist.checklist_item.length} itens`" editable="false"></TextView>
    <Button width="30%" :text="statusativ" @tap="abrechecklist" :class="classestatusatividade"/>
  </FlexboxLayout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "bwda-checklist",
  props: ["checklist"],
  methods: {
    abrechecklist() {
      this.$store.commit("setIdChecklistAberto", this.checklist.checklist_id);
      this.$navigateTo("M00700ChecklistOS");
    },
    checklistaberta() {
      return this.checklist.checklist_id === this.id_checklist_aberto;
    },
  },
  computed: {
    ...mapState(["id_checklist_aberto"]),
    statusativ() {
      if (this.checklist.respondido) return "Respondida";
      else if (this.checklistaberta()) return "Aberta";
      else return "Abrir";
    },
    classestatusatividade() {
      return {
        btn: true,
       'btn-primary': !this.checklistaberta() && !this.checklist.respondido,
       'btn-green': this.checklist.respondido,
       'btn-orange': this.checklistaberta() && !this.checklist.respondido, 
      }
    },
  },
};
</script>

<style>
</style>
