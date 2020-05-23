import './mod.ts';

const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (main)`);
};

// 使用的是事件池机制
window.addEventListener('load', handler); // => 5
window.addEventListener('unload', handler); // => 8

// 重复就会覆盖
window.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (main)`); // => 3
};

window.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (main)`); // => 6
};

console.log('log from main script'); // => 2

// Deno 中 on 监听事件比 add 添加的事件先执行，在 V8 中，谁先书写在前就是谁先执行
