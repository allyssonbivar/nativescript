<template>
  <Button @tap="showpicker">{{label}}</Button>
</template>

<script>
import moment from "moment";

const Modal = {
  props: ["date"],
  data: _ => ({ current: new Date() }),
  mounted() {
    if (this.date) this.current = this.date;
  },
  template: `
    <Page>
      <StackLayout>
        <Label text="Selecione a data"/>
        <DatePicker v-model="current"/>
        <Button @tap="$modal.close(current)">Selecionar</Button>
      </StackLayout>
    </Page>
  `
};

export default {
  name: "bwda-date-picker",
  props: ["value"],
  data: _ => ({ date: new Date().toJSON(), m: Modal }),
  mounted() {
    if (!this.value) this.$emit("input", this.date);
    else this.date = new Date(this.value);
  },
  computed: {
    label() {
      return moment(this.date).format("YYYY-MM-DD");
    }
  },
  methods: {
    showpicker() {
      // console.log(this.value);
      this.$showModal(this.m, {
        props: { date: moment(this.date).toDate() }
      }).then(ret => {
        if (ret) {
          this.date = ret;
          this.$emit("input", ret.toJSON());
        }
      });
    }
  }
};
</script>

<style>
</style>
