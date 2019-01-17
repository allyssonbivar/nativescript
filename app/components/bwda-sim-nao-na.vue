<template>
  <FlexboxLayout justifyContent="center">
    <Button :class="resposta=='Sim'?'btn btn-primary':'btn'" @tap="resp('Sim')">Sim</Button>
    <Button :class="resposta=='Não'?'btn btn-primary':'btn'" @tap="resp('Não')">Não</Button>
    <Button :class="resposta=='N/A'?'btn btn-primary':'btn'" @tap="resp('N/A')">N/A</Button>
  </FlexboxLayout>
</template>

<script>
export default {
  props: ["value"],
  data: _ => ({ resposta: "" }),
  name: "bwda-sim-nao-na",
  mounted() {
    this.resposta = this.value;
  },
  methods: {
    resp(v) {
      this.resposta = v;
      this.$emit("input", v);
    }
  }
};
</script>

<style>
</style>
