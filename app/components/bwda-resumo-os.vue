<template>
  <TextView editable="false" @tap="e => $emit('tap',e)" :color="corcriticidade">
    <FormattedString>
      <Span text="OS #" class="bwda-resumo-os-name "/>
      <Span :text="`${os.ordem_servico_id}\n`" class="i bwda-resumo-os-id-os"/>
      <Span text="Criticidade " class="b"/>
      <Span
        :text="`${os.criticidade_ordem_servico.criticidade_ordem_servico_descricao}\n`"
        class="i"
      />
      <Span text="Agendamento " class="b"/>
      <Span :text="`${dtagendamento}\n`" class="i"/>
      <Span text="Projeto " class="b"/>
      <Span :text="`${projeto}\n`" class="i"/>
      <Span text="Torre " class="b"/>
      <Span :text="`${torre}\n`" class="i"/>
    </FormattedString>
  </TextView>
</template>

<script>
export default {
  name: "bwda-resumo-os",
  props: ["os"],
  computed: {
    dtagendamento() {
      return this.os.ordem_servico_dtagendamento.replace(
        /(\d+)-(\d+)-(\d+)T.+/,
        "$3/$2/$1"
      );
    },
    projeto() {
      return (
        (this.os.torre &&
          this.os.torre.sitio &&
          this.os.torre.sitio.projeto &&
          this.os.torre.sitio.projeto.projeto_titulo) ||
        "-"
      );
    },
    torre() {
      return (this.os.torre && this.os.torre.torre_identificador) || "-";
    },
    corcriticidade() {
      switch (this.os.criticidade_ordem_servico.criticidade_ordem_servico_id) {
        case 2:
          return "orange";
        case 3:
          return "red";
        default:
          "white";
      }
    }
  }
};
</script>
