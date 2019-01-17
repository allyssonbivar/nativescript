<template>
  <TextView editable="false" @tap="e => $emit('tap', e)">
    <FormattedString>
      <Span text="Membros da equipe: " class="b"/>
      <Span :text="`${membros || '-'}\n`" class="i"/>
      <Span text="Motivacao: " class="b"/>
      <Span :text="`${os.ordem_servico_motivacao}\n`" class="i"/>
      <Span text="Observações: " class="b"/>
      <Span :text="`${os.ordem_servico_observacoes}\n`" class="i"/>
    </FormattedString>
  </TextView>
</template>

<script>
export default {
  name: "bwda-detalhes-adicionais-os",
  props: ["os"],
  computed: {
    membros() {
      return this.os.ordem_servico_membro_equipe
        .map(e => `${e.pessoa_email}`)
        .join(", ");
    }
  }
};
</script>

<style>
</style>
