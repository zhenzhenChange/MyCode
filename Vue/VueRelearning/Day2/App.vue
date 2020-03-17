<template>
  <div>
    <Functional :level="index + 1" v-for="(item, index) in 6" :key="index">生日快乐</Functional>
    <List :data="['足球', '篮球', '羽毛球']" :render="render"></List>
    <ListSlot :data="['哈哈哈', '呵呵呵', '嘿嘿嘿']">
      <template v-slot:MyName="scope">
        <li>{{ scope.item }}</li>
      </template>
    </ListSlot>
  </div>
</template>

<script>
import List from "./components/List";
import ListSlot from "./components/ListSlot";
import Functional from "./components/Functional.js";
export default {
  components: { Functional, List, ListSlot },
  methods: {
    render(h, data) {
      return h("h1", {}, data);
    },
  },
};
</script>

<style></style>
