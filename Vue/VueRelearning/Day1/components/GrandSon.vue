<template>
  <div>
    GrandSon {{ money }}
    <button @click="changeParent">修改父亲</button>
    <div>{{ this.parentValue.isSmoke }} {{ provideValue }}</div>
    <div>{{ $attrs }}</div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  inject: ["parentValue", "provideValue"],
  props: ["money"],
  methods: {
    changeParent() {
      // this.$parent.count++;
      // this.$parent.$emit("changeValue", 999);
      this.$dispatch("changeValue", 22);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$bus.$emit("nextTick", "321");
    });
    // this.$listeners.son();
  },
};
</script>

<style></style>
