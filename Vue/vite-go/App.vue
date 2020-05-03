<template>
  <h1>Hello Vite + Vue 3!</h1>
  <p>Edit ./App.vue to test hot module replacement (HMR).</p>
  <p>
    <span>Count is: {{ count }}</span>
    <br />
    <button @click="count++">单击我</button>
  </p>
  <h1>支持热更新了</h1>
</template>

<script>
export default {
  data: () => ({ count: 0 }),
};
</script>

<style scoped>
h1 {
  color: #4fc08d;
}

h1,
p {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
