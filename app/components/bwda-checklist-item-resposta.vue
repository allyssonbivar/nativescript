<template>
  <WrapLayout>
    <Label :text="resposta.checklist_item_resposta_descricao"/>
    <TextField
      width="100%"
      returnKeyType="done"
      v-if="resposta.tipo_checklist_item_resposta_id == 1"
      v-model="resposta.checklist_item_resposta_valor"
    />
    <Switch
      width="100%"
      v-if="resposta.tipo_checklist_item_resposta_id == 2"
      v-model="resposta.checklist_item_resposta_selecionado"
    />
    <bwda-sim-nao-na
      width="100%"
      v-if="resposta.tipo_checklist_item_resposta_id == 3"
      v-model="resposta.checklist_item_resposta_valor"
    />
    <bwda-date-picker
      width="100%"
      v-if="resposta.tipo_checklist_item_resposta_id == 4"
      v-model="resposta.checklist_item_resposta_valor"
    />
    <bwda-time-picker
      width="100%"
      v-if="resposta.tipo_checklist_item_resposta_id == 5"
      v-model="resposta.checklist_item_resposta_valor"
    />
    <bwda-get-picture
      width="100%"
      v-if="resposta.tipo_checklist_item_resposta_id == 6"
      v-model="resposta"
    />
    <WrapLayout
      v-if="resposta.checklist_item_resposta_esperada && resposta.checklist_item_resposta_valor && resposta.checklist_item_resposta_valor != resposta.checklist_item_resposta_esperada"
      width="100%"
    >
      <Label width="100%" text="Observação"/>
      <TextView
        width="100%"
        hint="Descreva a situação que motivou esta resposta"
        v-model="resposta.checklist_item_resposta_observacao"
      />
    </WrapLayout>
  </WrapLayout>
</template>

<script>
export default {
  name: "bwda-checklist-item-resposta",
  props: ["resposta"],
  data: _ => ({ date: new Date(), time: new Date() })
};
</script>

<style>
</style>
