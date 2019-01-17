<template>
  <Button @tap="showpicker">{{label}}</Button>
</template>

<script>
import moment from "moment";

const Modal = {
  props: ["time"],
  data: _ => ({ current: new Date() }),
  mounted() {
    if (this.time) this.current = this.time;
  },
  template: `
    <Page>
      <StackLayout>
        <Label text="Selecione a data"/>
        <TimePicker v-model="current"/>
        <Button @tap="$modal.close(current)">Selecionar</Button>
      </StackLayout>
    </Page>
  `
};

export default {
  name: "bwda-time-picker",
  props: ["value"],
  data: _ => ({ time: new Date().toJSON(), m: Modal }),
  mounted() {
    if (!this.value) this.$emit("input", this.time);
    else this.time = new Date(this.value);
  },
  computed: {
    label() {
      return moment(this.time).format("HH:mm");
    }
  },
  methods: {
    showpicker() {
      // console.log(this.value);
      this.$showModal(this.m, {
        props: { time: moment(this.time).toDate() }
      }).then(ret => {
        if (ret) {
          this.time = ret;
          this.$emit("input", ret.toJSON());
        }
      });
    }
  }
};
</script>

<style>
</style>
