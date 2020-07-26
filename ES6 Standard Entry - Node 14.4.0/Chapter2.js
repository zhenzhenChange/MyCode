// let：所声明的变量只在 let 命令所在的代码块内有效（块级作用域）
{
  let a = 10;
  var b = 20;
}

console.log(b); // 20
console.log(a); // ReferenceError: a is not defined

for (let i = 0; i < 10; i++) {}
console.log(i); // ReferenceError: i is not defined

var ary = [];
for (var i = 0; i < 10; i++) {
  // ary[i] 的 i 每次循环都会改变
  ary[i] = function () {
    // 始终指向全局的 i，最终取循环结束的值
    console.log(i);
  };
}

ary[5](); // 10
ary[6](); // 10

var ary = [];
for (let i = 0; i < 10; i++) {
  // ary[i] 的 i 每次循环都会改变
  ary[i] = function () {
    // 由于 i 是由 let 声明的，当前的 i 只在本轮有效，每次循环都会重新声明一个 i
    // 而上一轮的 i 会被引擎内部记录，所以下一轮循环的 i 初始化时，是在上一轮的 i 的值的基础上计算
    console.log(i);
  };
}

ary[5](); // 5
ary[6](); // 6

// 循环变量的部分是父作用域
for (let i = 0; i < 3; i++) {
  // 这部分是子作用域
  let i = 'bbbb';
  console.log(i); // 连续输出 3 次：bbbb 互相没有干扰
}

/* ------------------------------------------------------ */

// 会发生变量提升，但未赋值
console.log(foo); // undefined
var foo = 2;

// 不会发生变量提升
console.log(bar); // ReferenceError: Cannot access 'bar' before initialization (ReferenceError：初始化之前无法访问 bar )
let bar = 3;

/* ------------------------------------------------------ */

var temp = 123;

// 暂时性死区 TDZ：在变量声明之前，该变量不可用
if (true) {
  temp = 'abc'; // ReferenceError: Cannot access 'temp' before initialization

  // 生成块级作用域，所声明的变量绑定了这个作用域，不再受外部影响
  // 这些声明的变量从一开始就形成封闭作用域，只要在声明之前使用这些变量，就会报错
  let temp;
}

if (true) {
  // TDZ 开始
  // tmp = 'abc';
  // console.log(tmp); // ReferenceError: Cannot access 'tmp' before initialization

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}

// TDZ 意味着，只要在声明之前使用该变量，都将报错，typeof 也不例外
if (true) {
  typeof noVar; // undefined
  typeof tmp; // ReferenceError: Cannot access 'tmp' before initialization
  let tmp;
}

// 函数参数 TDZ
function bar(x = y, y = 2) {
  return [x, y];
}

// 参数 x 的默认值是 y，而 y 还未声明就使用，属于 TDZ
console.log(bar()); // ReferenceError: Cannot access 'y' before initialization

// 此时 x 已经声明，y 可以使用 x
function bar(x = 2, y = x) {
  return [x, y];
}

console.log(bar()); // [2, 2]

// 赋值 TDZ ，只要变量未声明完成前使用，就报错
var x = x;
let y = y; // ReferenceError: Cannot access 'y' before initialization （node 环境下） 浏览器环境下报：ReferenceError: y is not defined

/* ------------------------------------------------------ */

// let 不允许在相同作用域内重复声明同一个变量
let a = 10;
var a = 20; // SyntaxError: Identifier 'a' has already been declared

let b = 10;
let b = 20; // SyntaxError: Identifier 'a' has already been declared

function bar(arg) {
  let arg = 10; // SyntaxError: Identifier 'arg' has already been declared
}
bar();

// 正常通过，因为是不同作用域
function foo(arg) {
  {
    let arg = 20;
  }
}
foo();

/* ------------------------------------------------------ */

var temp = new Date();

function fn() {
  console.log(temp); // undefined

  // 迷惑行为：if 进不去为什么还会覆盖外层 temp 变量
  if (false) {
    var temp = '123';
  }
}
fn();

// 内存泄漏
var str = 'hello';

for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
}

// 循环结束依然存在
console.log(i); // 5

// 生成块级作用域
function fn() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
fn();

{
  {
    let temp = 'abc';
  }
  console.log(temp); // ReferenceError: temp is not defined
}

// 正常通过：不同作用域没有影响
{
  let temp = 123;
  {
    let temp = 'abc';
  }
}

// 函数声明会提升到全局作用域顶部或函数作用域顶部
function fn() {
  console.log('Fn Fn Fn ......');
}

// 可在块级作用域内声明函数，且提升到块级作用域顶部
(function () {
  /* 
  if (false) {
    function fn() {
      console.log('fn fn fn ......');
    }
  } 
  */
  //  等价于 ↓ ES6环境下

  var fn;

  if (false) {
    function fn() {
      console.log('fn fn fn ......');
    }
  }

  // 处于块级作用域内，fn 并未赋值
  console.log(fn); // undefined
  fn(); // TypeError: fn is not a function
})();

/* ------------------------------------------------------ */

// const 声明一个只读常量，必须初始化值，且值（变量指向的内存地址）不能更改，除此之外，与 let 一样有块级作用域、TDZ、不可重复声明的特性
const PI = 3.14;
console.log(PI); // 3.14
PI = 3; // TypeError: Assignment to constant variable.

// const foo; // SyntaxError: Missing initializer in const declaration

// 保证引用类型的指针地址不可变，但数据结构可变
const obj = {};
obj.abc = '1';
obj.def = '2';
console.log(obj); // {abc: '1', def: '2'}
obj = []; // TypeError: Assignment to constant variable.

// 冻结对象
const foo = Object.freeze({});
foo.bar = 123;
console.log(foo); // {}

/* ------------------------------------------------------ */

// 使用 let 、const 、 class 声明的全局变量不属于顶层对象（window、global）的属性，逐步与顶层对象的属性隔离
// 浏览器环境下
var a = 1;
console.log(this.a); // 1
console.log(window.a); // 1

let b = 33;
console.log(this.b); // undefined
console.log(window.b); // undefined

/**
 * 1.在浏览器中，顶层对象为 window
 * 2.在 Node 中，顶层对象为 global
 * 3.在 WebWorker 中，顶层对象为 self
 *
 * new Function("return this")() 总会返回全局对象，若浏览器使用了 CSP 内容安全策略，eval、new Function() 将不可用
 */
