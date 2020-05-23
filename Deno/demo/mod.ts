const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (imported)`);
};

window.addEventListener('load', handler); // => 4
window.addEventListener('unload', handler); // => 7

window.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (imported)`); // => 未执行
};

window.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (imported)`); // => 未执行
};

console.log('log from imported script'); // => 1
