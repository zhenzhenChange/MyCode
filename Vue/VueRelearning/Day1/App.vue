<template>
  <div id="app">
    <Parent></Parent>
  </div>
</template>

<script>
import Parent from "./components/Parent.vue";
export default {
  components: { Parent },
  mounted() {
    // this.$broadcast("brodcast");
  },
};
</script>
