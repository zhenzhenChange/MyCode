// 模式匹配 - 解构赋值
// 数组解构（按次序排列，按位置决定）
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

const [a, , b] = [1, 2, 3];
console.log(a, b); // 1 3

const [a, [[b], c]] = [1, [[2], 3]];
console.log(a, b, c); // 1 2 3

const [, , a] = [1, 2, 3];
console.log(a); // 3

const [a, ...b] = [1, 2, 3];
console.log(a, b); // 1 [ 2, 3 ]

/* --------------------------------------------------- */

// 解构失败，变量的值为 undefined
const [a, b, ...c] = [1];
console.log(a, b, c); // 1 undefined []

const [a] = [];
console.log(a); // undefined

/* --------------------------------------------------- */

// 不完全解构 - 模式匹配部分
const [a, b] = [1, 2, 3, 4];
console.log(a, b); // 1 2

const [a, [b], c] = [1, [2, 3], 4];
console.log(a, b, c); // 1 2 4

/* --------------------------------------------------- */

// 等号右边必须是一个可迭代数据结构（拥有 iterator 接口）
const [a] = 1;
console.log(a); // TypeError: 1 is not iterable

const [a] = {};
console.log(a); // TypeError: {} is not iterable

const [x] = new Set([1, 2, 3]);
console.log(x); // 1

// Generator 函数具有 iterator 接口
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const [a, b, c, d, e, f, x, y, z] = fibs();
console.log(a, b, c, d, e, f, x, y, z); // 0 1 1 2 3 5 8 13 21

/* --------------------------------------------------- */

// 解构指定默认值
const [a = 1] = [];
console.log(a); // 1

const [a, b = true] = [1];
console.log(a, b); // 1 true

// ES6 严格使用 === 匹配，当位置成员 === 于 undefined 时，默认值生效
const [a, b = 13] = [1, undefined];
console.log(a, b); // 1 13

// null == undefined / null !== undefined
const [a, b = 13] = [1, null];
console.log(a, b); // 1 null

/* --------------------------------------------------- */

// 惰性求值，当用到时才求值
function fn() {
  console.log('fn');
}
const [x = fn()] = [1];
console.log(x); // 1

// 取得默认值 - 求值
function fn() {
  console.log('fn');
}
const [x = fn()] = [];
console.log(x); // fn undefined
console.log([1][0]);

/* --------------------------------------------------- */

// 遵循新规则
var [x = y, y = 2] = [1, 3];
console.log(x, y); // 1 3

var [x = y, y = 2] = [1];
console.log(x, y); // 1 2

var [x = y, y = 2] = [];
console.log(x, y); // undefined 2

// 引用解构赋值的其他变量，该变量必须已经声明
const [x = y, y = 3] = [];
console.log(x, y); // ReferenceError: Cannot access 'y' before initialization

/* --------------------------------------------------- */

// 对象解构赋值（无序的，按同名决定）
const { a, b } = { a: '123', b: '456' };
console.log(a, b); // 123 456

// 次序不一致但不影响解构
const { b, a } = { a: '123', b: '456' };
console.log(a, b); // 123 456

const { x } = { a: '123' };
console.log(x); // undefined

// 重命名
const { x: y } = { x: 'xxx' };
console.log(y); // xxx
console.log(x); // ReferenceError: x is not defined

// 本质（简写） -> 内部机制：先寻找同名属性，在赋值给对应的变量，真正被赋值的是后者。前者是匹配的模式，后者是变量
const { x: x } = { x: 'xxx' }; // => 简写 const { x } = { x: "xxx" }
console.log(x); // xxx

/* --------------------------------------------------- */

// 嵌套解构
const obj = {
  p: ['obj', { y: 'xyz' }],
};

const {
  p,
  p: [x, { y }],
} = obj;

console.log(p, x, y); // [ 'obj', { y: 'xyz' } ] obj xyz

const node = {
  x: {
    y: {
      z: 1,
      w: 5,
    },
  },
};

const {
  x,
  x: { y },

  // x y 是模式 / z w 是变量
  x: {
    y: { z, w },
  },
} = node;
console.log(x, y, z, w); // { y: { z: 1, w: 5 } } { z: 1, w: 5 } 1 5

// 嵌套赋值
const obj = {};
const ary = [];
({ foo: obj.foo, bar: ary[0] } = { foo: 'foo', bar: 'bar' });
console.log(obj, ary); // { foo: 'foo' } [ 'bar' ]

/* --------------------------------------------------- */

// 对象解构指定默认值
const { x = 3 } = {};
console.log(x); // 3

const { x, y = 5 } = { x: 1 };
console.log(x, y); // 1 5

const { x: y = 3 } = {};
console.log(y); // 3

const { x: y = 5 } = { x: 111 };
console.log(y); // 111

// 对象的属性值严格 === undefined 默认值才会生效
const { x = 3 } = { x: undefined };
console.log(x); // 3

const { x = 3 } = { x: null };
console.log(x); // null

// 解构失败 - 值为 undefined
const { x } = { y: 3 };
console.log(x); // undefined

// foo 解构出来是 undefined
const {
  foo: { bar },
} = { bar: 'bar' };
console.log(bar); // TypeError: Cannot read property 'bar' of undefined

// 加上圆括号形成表达式，避免语法错误问题
let x;
({ x } = { x: 1 });
console.log(x); // 1

// 解构内置对象
const { log, sin, cos } = Math;
console.log(log, sin, cos); // [Function: log] [Function: sin] [Function: cos]

// 解构数组的属性
const { 0: x, length } = [1, 2, 3, 4];
console.log(x, length); // 1 4

/* --------------------------------------------------- */

// 字符串解构赋值
const [a, b, c, d, e, f] = 'hello';
console.log(a, b, c, d, e, f); // h e l l o undefined

const { length } = 'hello';
console.log(length); // 5

/* --------------------------------------------------- */

// 数值、布尔值的解构赋值 - 其包装对象拥有 toString 属性 - 等号右边不是对象或数组时，将其转换成对象，原始类型转换成对象就是其包装对象形式
const { toString: num } = 123;
const { toString: bool } = true;
console.log(num); // [Function: toString]
console.log(bool); // [Function: toString]
console.log(num === bool); // false
console.log(num === Number.prototype.toString); // true
console.log(bool === Boolean.prototype.toString); // true

// 不能转换成对象
const { prop: x } = undefined;
const { prop: y } = null;
console.log(x, y); // TypeError: Cannot destructure property 'prop' of 'undefined' as it is undefined.

/* --------------------------------------------------- */

// 函数参数解构赋值
function add([x, y]) {
  return x + y;
}
// 表明传入数组，但已被解构
console.log(add([1, 2])); // 3

// 第一个参数解构
console.log(
  [
    [1, 2],
    [3, 4],
  ].map(([a, b]) => a + b),
); // [ 3, 7 ]

// 为形参指定默认值
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}
// 解构失败时，使用默认值
console.log(move({ x: 3, y: 8 })); // [ 3, 8 ]
console.log(move({ x: 3 })); // [ 3, 0 ]
console.log(move({})); // [ 0, 0 ]
console.log(move()); // [ 0, 0 ]

// 为实参指定默认值
function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}
console.log(move({ x: 3, y: 8 })); // [ 3, 8 ]
console.log(move({ x: 3 })); // [ 3, undefined ]
console.log(move({})); // [ undefined, undefined ]
console.log(move()); // [ 0, 0 ]

// 触发默认值 - 严格 === undefined
console.log([1, undefined, 2].map((x = '===') => x)); // [ 1, '===', 2 ]

/* --------------------------------------------------- */

/**
 * 用途：
 * ① 交换变量的值 [x, y] = [y, x]
 * ② 从函数返回多个值 return [x, y]
 * ③ 函数参数的定义 fn([x, y, z])
 * ④ 提取 JSON 数据 const { data } = JSONData
 * ⑤ 函数参数默认值 fn({ x = 2} = {})
 * ⑥ 遍历具有 iterator 接口的数据结构 for (let [key, value] of map)
 * ⑦ 输入模块的指定方法 const { method } = require("methods")
 */
