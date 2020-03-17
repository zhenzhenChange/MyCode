<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <h1>{{ $store.state.username }}</h1>
      <input type="text" v-model="loginForm.user_account" />
      <input type="text" v-model="loginForm.user_pwd" />
      <button @click="login">登录</button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    loginForm: {
      user_account: "",
      user_pwd: ""
    }
  }),
  methods: {
    // 组件派发数据 ---> 由Vuex（Actions）请求API ---> 返回的数据commit给Mutations ---> 存放（修改）State ---> 组件渲染
    async login() {
      await this.$store.dispatch("Login", this.loginForm);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
