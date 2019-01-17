<template>
  <FlexboxLayout flexWrap="wrap">
    <TextView editable="false" @tap="e => $emit('tap',e)" width="100%" class="bwda-checklist-item-borda b">
      <FormattedString>
        <Span :text="checklistItem.checklist_item_descricao" class="bwda-checklist-item-font"/>
      </FormattedString>
    </TextView>
    <bwda-checklist-item-resposta
      v-for="r in checklistItem.checklist_item_resposta"
      :key="r.checklist_item_resposta_id"
      :resposta="r"
      width="100%"
    />
    <Label text width="100%" height="5%"/>
  </FlexboxLayout>
</template>

<script>
export default {
  name: "bwda-checklist-item",
  props: ["checklistItem"]
};
</script>
