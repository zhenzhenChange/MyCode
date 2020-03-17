<template>
  <div>
    <template v-for="(item, index) in data">
      <li :key="index" v-if="!render">{{ item }}</li>
      <ListItem v-else :key="`item-${index}`" :render="render" :item="item"></ListItem>
    </template>
  </div>
</template>

<script>
import ListItem from "./ListItem";
export default {
  props: ["data", "render"],
  components: { ListItem },
};
</script>

<style></style>
