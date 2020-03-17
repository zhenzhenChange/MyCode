<template>
  <div>
    <template v-for="item in data">
      <slot name="MyName" :item="item"></slot>
    </template>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style></style>
