import{pushScopeId as t,popScopeId as n,openBlock as u,createBlock as l,Fragment as o,createVNode as e,toDisplayString as c,withScopeId as a,createApp as p}from"https://unpkg.com/vue@3.0.0-beta.7/dist/vue.esm-browser.prod.js";var r={data:()=>({count:0})};const s=a("data-v-5b72cc04");t("data-v-5b72cc04");const d=e("h1",null,"Hello Vite + Vue 3!",-1),b=e("p",null,"Edit ./App.vue to test hot module replacement (HMR).",-1),i=e("br",null,null,-1),m=e("h1",null,"支持热更新了",-1);n();const v=s((function(t,n){return u(),l(o,null,[d,b,e("p",null,[e("span",null,"Count is: "+c(t.count),1),i,e("button",{onClick:n[1]||(n[1]=n=>t.count++)},"单击我")]),m],64)}));r.render=v,r.__scopeId="data-v-5b72cc04",p(r).mount("#app");
