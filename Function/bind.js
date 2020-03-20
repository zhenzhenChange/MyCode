/* "use strict";

var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = "[object Function]";

module.exports = function bind(that) {
  var target = this;
  if (typeof target !== "function" || toStr.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slice.call(arguments, 1);

  var bound;
  var binder = function() {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(slice.call(arguments)));
      if (Object(result) === result) {
        return result;
      }
      return this;
    } else {
      return target.apply(that, args.concat(slice.call(arguments)));
    }
  };

  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    boundArgs.push("$" + i);
  }

  bound = Function(
    "binder",
    "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }",
  )(binder);

  if (target.prototype) {
    var Empty = function Empty() {};
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }

  return bound;
}; */

/*
 * 1.bind没有原型
 * 2.箭头函数没有原型
 * 3.Object.create(null) 没有原型
 */

function MyBind(ctx = window, ...bindArgs) {
  /* => 1.缓存调用MyBind的上下文 */
  const target = this;

  /* => 2.如果调用MyBind的上下文不是一个函数，则抛出一个错误 */
  if (Object.prototype.toString.call(target) !== "[object Function]") {
    throw new TypeError(`${target} is not a function`);
  }

  /* => 3.创建一个空函数 */
  const Empty = function Empty() {};

  /* => 4.创建一个待执行函数 */
  const FN = function(...fnArgs) {
    return target.apply(this instanceof Empty ? this : ctx, [...bindArgs, ...fnArgs]);
  };

  /* => 5.将空函数的原型指向 new 生成的实例对象的原型 */
  Empty.prototype = this.prototype;

  /* => 6.将待执行函数的原型指向空函数的实例 */
  FN.prototype = new Empty();

  /* => 7.返回待执行函数 */
  return FN;
}

Function.prototype.MyBind = MyBind;

function Person(country, name, age) {
  this.country = country;
  this.name = name;
  this.age = age;
}

var ChinesePerson = Person.bind(undefined, "China");
var ChinesePerson2 = Person.MyBind(undefined, "China");

var person1 = new ChinesePerson("LiLi", 14);
var person2 = new ChinesePerson2("LiLi", 14);

console.log(ChinesePerson);
console.log(ChinesePerson2);
console.log(person1);
console.log(person2);
