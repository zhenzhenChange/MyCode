/*
 * 高阶函数
 * 1.参数是函数
 * 2.返回值是函数
 *
 */
const say = (...args) => {
  console.log("say", args);
};

Function.prototype.before = function(cb) {
  return (...args) => {
    cb();
    this(...args);
  };
};

const newSay = say.before(function() {
  console.log("Before Say");
});

/* -------------------------------------------------- */

/*
 * 函数柯里化
 *
 */
function checkType(type, val) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

function add(a, b, c, d, e, f, g) {
  return a + b + c + d + e + f + g;
}

/* 1 */
function checkTypeC(type) {
  return function(val) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  };
}

/* 2 */
function curring(fn, params = []) {
  const len = fn.length;
  return function(...args) {
    params = [...params, ...args];
    const paramsLen = params.length;
    if (paramsLen < len) {
      return curring(fn, params);
    }
    return fn(...params);
  };
}

const typeArray = ["Number", "String", "Boolean", "Object"];

const util = {};

typeArray.forEach(item => {
  util[`is${item}`] = curring(checkType)(item);
});

// console.log(curring(add)(1)(2)(3)(4)(5)(6, 8));
// console.log(util.isString("change"));

/* -------------------------------------------------- */

/* 在N次之后再执行方法 */
function say1() {
  console.log("say");
}

const after = (count, fn) => obj => --count === 0 && fn(obj);

const newSay1 = after(3, function() {
  say1();
});

// newSay1();
// newSay1();
// newSay1();

/* -------------------------------------------------- */

/* 并发操作，类似 Promise.all()  */
const fs = require("fs");

const go = after(3, function(obj) {
  console.log(obj);
});

const events = {
  obj: {},
  eventsArray: [],
  addEvent: function(event) {
    this.eventsArray.push(event);
  },
  emit: function() {
    this.eventsArray.forEach(fn => fn());
  },
};


fs.readFile("./name.txt", "utf8", (err, data) => {
  events.obj["name"] = data;
  events.emit();
});

fs.readFile("./age.txt", "utf8", (err, data) => {
  events.obj["age"] = data;
  events.emit();
});
