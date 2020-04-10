// 打破完整运行
var x = 1;

function* foo() {
  x++;
  yield;
  console.log('x:', x);
}

function bar() {
  x++;
}

var it = foo();
it.next(); // x++ = 2
bar(); // x++ = 3
it.next(); // x: 3

/*
  console.log(Object.prototype.toString.call(foo)); // [object GeneratorFunction]
  console.log(Object.prototype.toString.call(it)); // [object Generator]
*/

/* =============================================================================== */

// 输入与输出（传参与返回值）
function* foo(x, y) {
  return x * y;
}

var it = foo(5, 6);
console.log(it.next().value); // 30

/* =============================================================================== */

// 迭代消息传递
function* foo(x) {
  var y = x * (yield);
  return y;
}

var it = foo(5);
it.next();
console.log(it.next(4).value); // 20

/* =============================================================================== */

// yield 与 next 建立一个双向消息传递系统（有 N 个 yield ，就要执行 N + 1 个 next）
function* foo(x) {
  var y = x * (yield 'zhenzhen');
  return y;
}

var it = foo(5);
console.log(it.next().value); // zhenzhen
// console.log(it.next("444").value); // zhenzhen 第一次为启动生成器，将会忽略传入的所有参数
console.log(it.next(4).value); // 20

/* =============================================================================== */

// 多个迭代器：每次构建一个迭代器，就隐式构建了一个生成器实例，通过这个迭代器控制这个生成器实例（一一对应）。
function* foo() {
  var x = yield 2;
  z++;
  var y = yield x * z;
  console.log(x, y, z);
}

var z = 1;

var it1 = foo();
var it2 = foo();

var v1 = it1.next().value; // 迭代器 1 启动，遇到 yield 暂停，且返回 2 ==> v1: 2
var v2 = it2.next().value; // 迭代器 2 启动，遇到 yield 暂停，且返回 2 ==> v2: 2

// 第一个迭代器继续执行，v2 * 10 = 20
// 传给第一个 yield ，所以 x: 20
// 继续执行 z++ = 2，x * z = 40
// 遇到第二个 yield 暂停，返回40。即 v1: 40
v1 = it1.next(v2 * 10).value;

// 第二个迭代器继续执行，v1 * 5 = 200
// 传给第一个 yield ，所以 x: 200
// 继续执行 z++ = 3，x * z = 600
// 遇到第二个 yield 暂停，返回 600。即 v2: 600
v2 = it2.next(v1 * 5).value;

it1.next(v2 / 2); // 第一个迭代器继续执行，v2 / 2 = 300 ，所以 y: 300 。此时输出 x: 20, y: 300, z: 3
it2.next(v1 / 4); // 第二个迭代器继续执行，v1 / 4 = 10 ，所以 y: 10 。此时输出 x: 200, y: 10, z: 3

/* =============================================================================== */

// 练习
var a = 1;
var b = 2;

function* foo() {
  a++;
  yield;
  b = b * a;
  a = (yield b) + 3;
}

function* bar() {
  b--;
  yield;
  a = (yield 8) + b;
  b = a * (yield 2); // 此时 a 的值是上一行代码中 a 的值，后面才遇到 yield ，此时 a 的值被冻结了，或者说已经确定了
  // b = (yield 2) * a; // 这里是先暂停，继续执行后，a 的值是最新的
}

function step(genFn) {
  var it = genFn();
  var yieldValue;

  return function () {
    yieldValue = it.next(yieldValue).value;
  };
}

var s1 = step(foo);
var s2 = step(bar);

/* 
  // No.1: foo 先运行完成，再到 bar
  s1(); // a: 2 ，暂停
  s1(); // b = 2 * 2 = 4，暂停，返回 4
  s1(); // 4 又传进来，a = 4 + 3 = 7

  s2(); // b: 3，暂停
  s2(); // 暂停，返回 8
  s2(); // 8 又传进来，a = 8 + 3 = 11，暂停，返回 2
  s2(); // 2 又传回来，b = 11 * 2 = 22

  console.log(a, b); // 11 22 
*/

// No.2: foo bar 交替运行（共享作用域并发运行）
s2(); // b-- = 1，暂停
s2(); // 暂停，返回 8
s1(); // a: 2，暂停
s2(); // 8 又传进来，a = 8 + 1 = 9，暂停，返回 2
s1(); // b = 1 * 9 = 9，暂停，返回 9
s1(); // 9 又传进来，a = 9 + 3 = 12
s2(); // 2 又传进来，b = 9 * 2 = 18 // a 已经被冻结

console.log(a, b); // 12 18

/* =============================================================================== */

// 同步错误处理
function* main() {
  var x = yield 'zhenzhen';

  /* 内部异常 */
  yield x.toLowerCase(); // x = 22
}

var it = main();
console.log(it.next().value); // zhenzhen

try {
  it.next(22);
} catch (error) {
  console.log(error); // TypeError
}

/* 手动抛入异常 */
function* main() {
  var x = yield 'zhenzhen';

  console.log('x:', x); // 没有到达这
}

var it = main();
it.next();

try {
  it.throw(22);
} catch (error) {
  console.log(error); // 22
}

/* =============================================================================== */

// 支持 Promise 的 Generator Runner
function run(genFn, ...args) {
  // 1.构建迭代器
  var it = genFn.apply(this, args);

  // 2.返回一个 Promise 用于生成器完成
  return Promise.resolve().then(function handleNext(value) {
    // 3.对下一个 yield 出的值运行
    var next = it.next(value);

    return (function handleResult(next) {
      // 4.如果生成器运行完成，则返回最后的值
      if (next.done) {
        return next.value;
      } else {
        // 5.如果成功，继续恢复异步循环，把决议的值发回生成器
        return Promise.resolve(next.value).then(handleNext, function handleError(error) {
          // 6.如果拒绝，将拒绝原因传回生成器进行错误处理
          return Promise.resolve(it.throw(error)).then(handleResult);
        });
      }
    })(next);
  });
}

/* =============================================================================== */

// 生成器消息委托
function* foo() {
  console.log('foo 1:', yield 'B');
  console.log('foo 2:', yield 'C');
  return 'D';
}

function* bar() {
  console.log('bar 1:', yield 'A');

  // 委托
  console.log('bar 2:', yield* foo());
  console.log('bar 3:', yield 'E');
  return 'F';
}

var it = bar();

console.log('out 1:', it.next().value); // A
console.log('out 2:', it.next(1).value); // bar1: 1 | B
console.log('out 3:', it.next(2).value); // foo1: 2 | C
console.log('out 4:', it.next(3).value); // foo2: 3 | bar2: D | E
console.log('out 5:', it.next(4).value); // bar3: 4 | F

// 非生成器消息委托
function* bar() {
  console.log('bar 1:', yield 'A');
  console.log('bar 2:', yield* ['B', 'C', 'D']);
  console.log('bar 3:', yield 'E');
  return 'F';
}

var it = bar();
console.log('out 1:', it.next().value); // A
console.log('out 2:', it.next(1).value); // bar1: 1 | B
console.log('out 3:', it.next(2).value); // C
console.log('out 4:', it.next(3).value); // D
console.log('out 5:', it.next(4).value); // bar2: undefined | E
console.log('out 6:', it.next(5).value); // bar3: 5 | F

// 异常委托
function* foo() {
  try {
    yield 'B';
  } catch (error) {
    console.log('foo error:', error);
  }
  yield 'C';
  throw 'D';
}

function* bar() {
  yield 'A';
  try {
    yield* foo();
  } catch (error) {
    console.log('bar error:', error);
  }
  yield 'E';
  yield* baz();
  yield 'G';
}

function* baz() {
  throw 'F';
}

var it = bar();
console.log('out 1:', it.next().value); // A
console.log('out 2:', it.next(1).value); // B
console.log('out 3:', it.throw(2).value); // foo error: 2 | C
console.log('out 4:', it.next(3).value); // bar error: D | E

try {
  console.log('out try:', it.next(4).value);
} catch (error) {
  console.log('out error:', error); // F
}

console.log('out 5:', it.next(5).value); // undefined
