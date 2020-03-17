<template>
  <div>
    Son Have {{ money }}
    <button @click="onChange">修改父组件</button>
    <GrandSon :money="money" @brodcast="saySon" v-bind="$attrs" v-on="$listeners"></GrandSon>
  </div>
</template>

<script>
import GrandSon from "./GrandSon";
export default {
  inheritAttrs: false,
  props: ["money"],
  components: {
    GrandSon,
  },
  data: () => ({
    count: 1,
  }),
  methods: {
    onChange() {
      this.$emit("changeValue", this.count);
    },
    saySon() {
      console.log("Son");
    },
    refSon() {
      console.log("RefSon");
    },
  },
};
</script>

<style></style>
