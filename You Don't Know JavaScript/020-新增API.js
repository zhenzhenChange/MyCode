/* Array */

// 1.Array.of() 应用场景：构造继承 Array 的子类，需要初始化单个数组元素时、传入回调函数的单个参数需要封装成数组时
var ary = Array(3); // 原生构造器，只传入一个参数且是数字，就会创建一个长度为这个数字的空数组
console.log(ary); // [ <3 empty items> ]

var ary = Array.of(3);
console.log(ary); // [ 3 ]

// 2.Array.from()
var arrLike = {
  0: 'foo',
  1: 'bar',
  length: 3,
};
console.log(arrLike); // { '0': 'foo', '1': 'bar', length: 3 }

// 将类数组对象转换成真正的数组
var ary = Array.from(arrLike);
console.log(ary); // [ 'foo', 'bar', undefined ]

// 复制一个数组（浅复制）
var ary = [1, 2, 3, 4, { name: 'zhenzhen' }];
var bry = Array.from(ary);
console.log(bry); // [ 1, 2, 3, 4, { name: 'zhenzhen' } ]
console.log(ary[4] === bry[4]); // true

// 回调参数
var ary = { 0: 1, 1: 2, length: 2 };
var bry = Array.from(ary, (item) => item * 2);
console.log(bry); // [ 2, 4 ]

// 3.copyWithin()
console.log([1, 2, 3, 4, 5].copyWithin(3, 0)); // [ 1, 2, 3, 1, 2 ]

// 4.fill() ：一个参数，全部填充或覆盖为传入的参数，后两个参数为 start end
var ary = Array(5).fill(5);
console.log(ary); // [ 5, 5, 5, 5, 5 ]

var ary = [1, 2, null, undefined, NaN, 5].fill(42, 2, 5);
console.log(ary); // [ 1, 2, 42, 42, 42, 5 ]

// 5.find() ：返回值本身
var ary = [1, 2, 3, 4, 5, 6];
var bry = ary.find((v) => v === 22);
console.log(bry); // undefined | 找不到 | 找到了就返回那个值

// 6.findIndex() ：返回值对应的索引
var ary = [1, 2, 3, 4, 5, 6];
var bry = ary.findIndex((i) => i === 22);
console.log(bry); // -1 | 找不到 | 找到了就返回那个值对应的索引

// 7.entries() / values() / keys() | 产生迭代器，数组迭代默认使用 values() 的迭代器
var ary = ['x', 'y', 'z'];
console.log([...ary.keys()]); // [ 0, 1, 2 ]
console.log([...ary.values()]); // [ 'x', 'y', 'z' ]
console.log([...ary.entries()]); // [ [ 0, 'x' ], [ 1, 'y' ], [ 2, 'z' ] ]
console.log([...ary[Symbol.iterator]()]); // [ 'x', 'y', 'z' ]

// 8.includes()
var ary = [NaN, null, undefined, 0, -0];

// indexOf 无法找出 NaN | 0 和 -0 被当做相等
console.log(ary.indexOf(NaN)); // -1
console.log(ary.indexOf(null)); // 1
console.log(ary.indexOf(undefined)); // 2
console.log(ary.indexOf(-0)); // 3
console.log(ary.indexOf(0)); // 3

// includes 能找出 NaN | 但是无法区分 0 和 -0
console.log(ary.includes(NaN)); // true
console.log(ary.includes(null)); // true
console.log(ary.includes(undefined)); // true
console.log(ary.includes(0)); // true ???
console.log(ary.includes(-0)); // true ???

/* ================================================================================== */

/* Object */

// 1.Object.is()
var x = NaN;
var y = 0;
var z = -0;
var w = +0;

console.log(x === x); // false
console.log(y === z); // true
console.log(y === w); // true
console.log(z === w); // true

console.log(Object.is(x, x)); // true
console.log(Object.is(y, z)); // false
console.log(Object.is(y, w)); // true
console.log(Object.is(w, z)); // false

// 2.Object.getOwnPropertySymbols() ：获取符号属性
var obj = { foo: 42, [Symbol('bar')]: 'bar', bar: 'bar' };
console.log(obj); // { foo: 42, bar: 'bar', [Symbol(bar)]: 'bar' }
console.log(Object.keys(obj)); // [ 'foo', 'bar' ]
console.log(Object.getOwnPropertyNames(obj)); // [ 'foo', 'bar' ]
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(bar) ]

// 3.Object.setPrototypeOf() ：设置对象的原型
var obj = {
  foo() {
    console.log('foo');
  },
};
var objP = {};

Object.setPrototypeOf(objP, obj);
objP.foo(); // foo

var objV = Object.setPrototypeOf({}, obj);
objV.foo(); // foo

// 4.Object.assign()
var target = {};
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };
var o4 = { d: 4 };

// 设置只读
Object.defineProperty(o3, 'e', {
  value: 5,
  writable: false,
  enumerable: true,
  configurable: false,
});

// 设置不可枚举
Object.defineProperty(o3, 'f', {
  value: 6,
  enumerable: false,
});

o3[Symbol('g')] = 7;

Object.defineProperty(o3, Symbol('h'), {
  value: 8,
  enumerable: false,
});

Object.setPrototypeOf(o3, o4);

// 只复制可枚举的，自身的，包括符号的属性
var copy = Object.assign(target, o1, o2, o3);
console.log(copy); // { a: 1, b: 2, c: 3, e: 5, [Symbol(g)]: 7 }

var obj = {
  foo() {
    console.log('foo');
  },
};

// 可指定原型的 target 对象
var objA = Object.assign(Object.create(obj), { name: 'zhenzhen' });
objA.foo(); // foo

/* ================================================================================== */

/* Math */

// 1.Math.trunc() ：返回数字的整数部分，字符串会尝试转化为数字
console.log(Math.trunc(11.22)); // 11
console.log(Math.trunc('11.22')); // 11
console.log(Math.trunc('11.22a')); // NaN

// 2.Math.hypot() ：平方和的平方根（广义勾股定理）
console.log(Math.hypot(3, 4)); // 5

// 3.Math.cbrt() ：立方根
console.log(Math.cbrt(27));

// 4.Math.sign() ：返回数字的符号，1 正数、-1 负数、0 正0、-0 负0、NaN 隐式转化成数字失败
console.log(Math.sign(0)); // 0
console.log(Math.sign(+0)); // 0
console.log(Math.sign(-0)); // -0
console.log(Math.sign(10)); // 1
console.log(Math.sign('2')); // 1
console.log(Math.sign(-10)); // -1
console.log(Math.sign('-2')); // -1
console.log(Math.sign(true)); // 1
console.log(Math.sign(false)); // 0
console.log(Math.sign('foo')); // NaN

/* ================================================================================== */

/* Number */
// 1.将全局引用归属到 Number 类
console.log(Number.parseInt === parseInt); // true
console.log(Number.parseFloat === parseFloat); // true

// 2.新定义静态函数
// isNaN() 对非数字转化，有可能会误判返回 true
// Number.isNaN() 不会强制转换类型
console.log(Number.isNaN === isNaN); // false

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(232)); // false
console.log(Number.isNaN('NaN')); // false
console.log(Number.isNaN('foo')); // false
console.log(Number.isNaN('123')); // false

console.log(isNaN(NaN)); // true
console.log(isNaN(232)); // false
console.log(isNaN('NaN')); // true
console.log(isNaN('231')); // false
console.log(isNaN('foo')); // true

// 3.任意两值之间的最小差
console.log(Number.EPSILON); // 2.220446049250313e-16

// 4.最大最小安全整数
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// 5.新定义静态函数，跟 isNaN 类似，不会进行类型转换
console.log(Number.isFinite === isFinite); // false

// 6.检测整数 | 安全整数
console.log(Number.isInteger(4)); // true
console.log(Number.isInteger(4.2)); // false
console.log(Number.isInteger(NaN)); // false
console.log(Number.isInteger(Infinity)); // false
console.log(Number.isInteger('4.2')); // false

console.log(Number.isSafeInteger(Math.pow(2, 53))); // false
console.log(Number.isSafeInteger(Math.pow(2, 53) - 1)); // true

// 7.自定义 isFloat
const isFloat = (v) => Number.isFinite(v) && !Number.isInteger(v);
console.log(isFloat(4)); // false
console.log(isFloat(4.2)); // true
console.log(isFloat('4.2')); // false

/* ================================================================================== */

/* String */
// 1.
console.log(String.fromCodePoint(0x1d49e)); // 𝒞
console.log('abc𝒞'.codePointAt(3).toString(16)); // 1d49e

console.log('e\u0301'.length); //2
console.log('e\u0301'.normalize()); // é
console.log('e\u0301'.normalize().length); // 1

// 2.String.raw()
console.log(String.raw`\ta${'bc'}d\xE9`); // \tabcd\xE9

// 3.repeat() ：重复字符串
console.log('abc'.repeat(3)); // abcabcabc

// 4.startsWith() / endsWidth() / includes() | 不可接受正则匹配
var str = 'Hello World';
console.log(str.startsWith('He')); // true | 判断以什么开头
console.log(str.endsWith('ld')); // true | 判断以什么结尾
console.log(str.includes('llo')); // true | 判断是否含有指定字符
