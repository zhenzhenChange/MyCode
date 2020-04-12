var a = 2;

{
  // var 声明至全局作用域
  var a = 3;
  console.log(a); // 3
}

console.log(a); // 2

/* =============================== */

var a = 21;

(function () {
  // IIFE 执行完即销毁栈帧
  var a = 31;
  console.log(a); // 31
})();

console.log(a); // 21

/* =============================== */

var a = 33;

{
  // let 劫持该作用域
  let a = 44;
  console.log(a); // 44
}

console.log(a); // 33

/* =============================== */

// 循环中的闭包
var funcs = [];

for (let i = 0; i < 5; i++) {
  funcs.push(function () {
    console.log(i);
  });
}

funcs[0](); // 0
funcs[1](); // 1
funcs[2](); // 2

// 等价于 ↓
var funcs = [];

for (var i = 0; i < 5; i++) {
  let j = i;
  funcs.push(function () {
    console.log(j);
  });
}

funcs[0](); // 0
funcs[1](); // 1
funcs[2](); // 2

/* =============================== */

('use strict');
{
  foo('内部'); // 内部

  function foo(arg) {
    console.log('foo: ', arg);
  }
}

foo('外部'); // 外部 | 严格模式下 foo is not defined

/* =============================== */

('use strict');
if (false) {
  function foo() {
    console.log('if');
  }
} else {
  function foo() {
    console.log('else');
  }
}

foo(); // false - else | true - if | 严格模式下 foo is not defined
