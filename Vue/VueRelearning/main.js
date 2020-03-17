import Vue from "vue";
import App from "./App.vue";

// 向上派发
Vue.prototype.$dispatch = function(eventName, value) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(eventName, value);
    parent = parent.$parent;
  }
};

// 向下广播
Vue.prototype.$broadcast = function(eventName, value) {
  const broadcast = children => {
    children.forEach(child => {
      child.$emit(eventName, value);
      if (child.$children) {
        broadcast(child.$children);
      }
    });
  };
  broadcast(this.$children);
};

Vue.prototype.$eventbus = new Vue();

new Vue({
  el: "#app",
  render: createElement => createElement(App),
});

/* Day1
  1.$children     子组件
  2.$parent       父组件
  3.$attrs        属性集合  v-bind  
  4.$listeners    事件集合  v-on    
  5.$broadcast    向下广播
  6.$eventbus     全局订阅  $emit  $on 类似计组系统总线   -----------------------------------
                                                          |     |     |     |     |     |
                                                         组件  组件   组件  组件  组件   组件
  7.$dispatch     向上派发
  8.inheritAttrs  设置$attrs不显示在DOM上
  9.inject        注入
  10.provide      提供
  11.$nextTick    事件轮询（本质为Promise.then()）、父组件的子组件先渲染完才到父组件的兄弟组件
*/

/* Day2
  1.函数式组件 render
  2.插槽（具名插槽）、内置组件：<slot></slot>、指令：v-slot、作用域：scope
*/

/* Day3
  1.vueConfig 配置优化
  2.API封装
  3.axios二次封装
  4.Vuex中actions的使用（异步）
  5.Vuex工作流程（请求时异步）: ---> （dispatch）组件派发数据
                              ---> （axios）由Actions请求API
                              ---> （commit）返回的数据提交到Mutations
                              ---> （save）存放到State
                              ---> （$store.state）组件渲染（回显、映射）
                              --->  https://vuex.vuejs.org/flow.png、https://vuex.vuejs.org/vuex.png
*/
