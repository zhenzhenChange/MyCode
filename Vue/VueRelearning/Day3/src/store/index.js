import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import API from "../api/index.js";

export default new Vuex.Store({
  state: { username: "" || localStorage.getItem("username") },
  mutations: { SaveUserName: (state, username) => (state.username = username) },
  // 异步方法使用action
  actions: {
    async Login({ commit }, loginForm) {
      const { code, data } = await API.login(loginForm);
      if (code === 0) {
        commit("SaveUserName", data.userName);
        localStorage.setItem("username", data.userName);
      }
    }
  },
  modules: {}
});
