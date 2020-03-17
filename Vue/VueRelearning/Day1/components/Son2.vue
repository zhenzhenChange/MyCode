<template>
  <GrandSon></GrandSon>
</template>

<script>
import GrandSon from "./GrandSon";
export default {
  components: {
    GrandSon,
  },
  mounted() {
    this.$bus.$on("nextTick", function() {
      console.log("object nextTick");
    });
  },
};
</script>

<style></style>
