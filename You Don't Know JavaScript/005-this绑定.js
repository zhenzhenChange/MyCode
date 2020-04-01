/* => 默认绑定（非严格模式），绑定到 window */
var a = 333;

function foo() {
  console.log(this.a); // => 333
}

foo();

/* ------------------------------------------------------ */

/* => 默认绑定（严格模式），this 绑定到 undefined */
("use strict");

var a = 333;

function foo() {
  console.log(this); // => undefined
}

foo();

/* ------------------------------------------------------ */

/* => 隐式绑定 */
function foo() {
  console.log(this.a);
}

var obj = {
  a: 11333,
  foo: foo,
};

obj.foo(); // => 11333

/* ------------------------------------------------------ */

/* => 隐式绑定（只绑定到最后一个） */
function foo() {
  console.log(this.a);
}

var obj = {
  a: 11333321321321,
  foo: foo,
};

var obj2 = {
  a: 222313213,
  obj: obj,
};

obj2.obj.foo(); // => 11333321321321

/* ------------------------------------------------------ */

/* => 隐式绑定丢失 */
function foo() {
  console.log(this.a);
}

var obj = {
  a: 11333321321321,
  foo: foo,
};

var a = "global";

var fooo = obj.foo; // => 实际上就是 foo 本身

fooo(); // => "global" 在全局作用域下调用，应用了默认绑定

console.log(fooo === foo); // => true

/* ------------------------------------------------------ */

/* => 显示绑定 */
function foo() {
  console.log(this.a);
}

var obj = {
  a: "obj and a",
  foo: foo,
};

foo.call(obj);

/* ------------------------------------------------------ */

/* => 显示绑定 --- 硬绑定 bind */
function foo(arg) {
  console.log(this.a, arg); // => 33 4
  return this.a + arg;
}

function binds(fn, ctx) {
  return function() {
    return fn.call(ctx, ...arguments);
  };
}

var obj = {
  a: 33,
};

var bar = binds(foo, obj);

console.log(bar(4)); // => 37

/* ------------------------------------------------------ */

/* => 显示绑定 --- API 绑定 */
var obj = {
  a: "id is :",
};

[1, 2, 3].forEach(function(item) {
  console.log(this.a, item);
}, obj);

/* ------------------------------------------------------ */

/* => new 绑定 */
function foo(a) {
  this.a = a;
}

var bar = new foo(3);
console.log(bar.a); // => 3

/* ------------------------------------------------------ */

/* => this 绑定优先级 */

/* => 显式绑定 > 隐式绑定 */
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: "obj1",
  foo: foo,
};

var obj2 = {
  a: "obj2",
  foo: foo,
};

/* => 隐式绑定 */
obj1.foo(); // => obj1
obj2.foo(); // => obj2

/* => 显式绑定 */
obj1.foo.call(obj2); // => obj2
obj2.foo.call(obj1); // => obj1

/* ------------------------------------------------------ */

/* => new 绑定 > 隐式绑定 */
function foo(b) {
  this.a = b;
}

var obj1 = {
  foo: foo,
};

var obj2 = {};

/* => 隐式绑定 */
obj1.foo(2);
console.log(obj1.a); // => 2

obj1.foo.call(obj2, 33);
console.log(obj2.a); // => 33

/* => new 绑定 */
var bar = new obj1.foo("new");

console.log(obj1.a); // => 2
console.log(bar.a); // => new

/* ------------------------------------------------------ */

/* => new 绑定 > 显示绑定（new 绑定不能与 call / apply 连用，只能用硬绑定 bind） */
/* => 在原生 bind 中会判断函数是否是 new 建立的，是的话就会使用新创建的 this 替换硬绑定的 this */
/* => 目的是可以预设参数，实现函数柯里化 */
function foo(b) {
  this.a = b;
}

var obj1 = {};

/* => 硬绑定 */
var bar = foo.bind(obj1);

bar(444);
console.log(obj1.a); // => 444

/* => new 绑定 */
var baz = new bar(555);
console.log(obj1.a); // => 444
console.log(baz.a); // => 555

/* ------------------------------------------------------ */

/* => 柯里化 */
function foo(a, b) {
  this.res = a + b;
}

/* => 由于 new 会改变硬绑定的 this ，所以第一个参数传啥都没关系 */
/* => 但是传入 null / undefined 会被忽略，执行默认绑定规则，可以指定一个没有原型的空对象 Object.create(null) */
var bar = foo.bind(null, "a");

var baz = new bar("b");
console.log(baz.res); // => ab

/* ------------------------------------------------------ */

/* => 间接引用，执行默认绑定规则 */
function foo() {
  console.log(this.a);
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // => 3
(p.foo = o.foo)(); // => 2
console.log((p.foo = o.foo)); // => foo

/* ------------------------------------------------------ */

/* => 软绑定 softBind */
function softBind(ctx, ...args) {
  const fn = this;

  const bound = function() {
    console.log(this);
    return fn.apply(!this || this === window ? ctx : this, args);
  };

  bound.prototype = Object.create(fn.prototype);

  return bound;
}

Function.prototype.softBind = softBind;

function foo() {
  console.log(this.name);
}

var obj1 = { name: "1" };
var obj2 = { name: "2" };
var obj3 = { name: "3" };

/* => 默认绑定 */
var fooo = foo.softBind(obj1);
fooo(); // => 1

/* => 隐式绑定 */
obj2.foo = foo.softBind(obj1);
obj2.foo(); // => 2

/* => 显示绑定 */
fooo.call(obj3); // => 3

/* => 默认绑定 */
setTimeout(obj2.foo, 1000); // => 1
