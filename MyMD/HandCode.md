# 模拟实现 JavaScript 中常用的方法、函数、关键字、有趣的玩意

## new

```js
function MyNew(fn, ...args) {
  /* => 1.创建一个新对象 */
  const obj = Object.create(null);

  /* => 2.将构造函数的原型（作用域）赋给这个新对象（this的指向就指向了这个新对象） */
  Reflect.setPrototypeOf(obj, fn.prototype);

  /* => 3.执行构造函数（this就是obj，给obj添加属性。this.xxx ） */
  const result = fn.call(obj, ...args);

  /* => 4.返回新对象（如果构造函数有返回值且是一个引用类型（引用类型皆是Object的实例），则返回该引用类型） */
  return result instanceof Object ? result : obj;
}

function Person(name) {
  this.name = name;
  return Person;
}

/* 如果没有 new 操作符，就是执行函数并拿到返回值 */
// const p = new Person("zhenzhen");
const p = MyNew(Person, 'Hello');
console.log(p);
```

## 实现一个 Symbol

## 实现一个迭代器，用于 Object

```js
var obj = {
  a: 'a',
  b: 'b',
  [Symbol.iterator]: function () {
    var i = 0;
    var self = this;
    var keys = Object.keys(this);
    return {
      next: function () {
        var obj = { value: self[keys[i++]], done: i > keys.length };
        if (obj.done) delete obj.value;
        return obj;
      },
    };
  },
};

for (let val of obj) {
  console.log(val);
}

var res = obj[Symbol.iterator]();
console.log(res.next());
console.log(res.next());
console.log(res.next());
```

## apply

```js
/* 与call的区别在于第二个参数可以是一个数组 */
function MyApply(ctx = window, args) {
  ctx.fn = this;
  const result = ctx.fn(args);
  Reflect.deleteProperty(ctx, 'fn');
  return result;
}

Function.prototype.MyApply = MyApply;
```

## call

```js
/* => 1.指定上下文（如果没有传参，默认为window） */
function MyCall(ctx = window, ...args) {
  /* => 2.给上下文添加一个fn函数，赋值为调用者 */
  ctx.fn = this;

  /* => 3.执行fn函数（有参数则传入参数），有返回值则返回 */
  const result = ctx.fn(...args);

  /* => 4.删除该函数 */
  Reflect.deleteProperty(ctx, 'fn');

  return result;
}

/* => 5.绑定至函数的原型 */
Function.prototype.MyCall = MyCall;
```

## bind （硬绑定）

```js
/*
 * 1.bind没有原型
 * 2.箭头函数没有原型
 * 3.Object.create(null) 没有原型
 */

function MyBind(ctx = window, ...bindArgs) {
  /* => 1.缓存调用MyBind的上下文 */
  const target = this;

  /* => 2.如果调用MyBind的上下文不是一个函数，则抛出一个错误 */
  if (Object.prototype.toString.call(target) !== '[object Function]') {
    throw new TypeError(`${target} is not a function`);
  }

  /* => 3.创建一个空函数 */
  const Empty = function Empty() {};

  /* => 4.创建一个待执行函数 */
  const FN = function (...fnArgs) {
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

var ChinesePerson = Person.bind(undefined, 'China');
var ChinesePerson2 = Person.MyBind(undefined, 'China');

var person1 = new ChinesePerson('LiLi', 14);
var person2 = new ChinesePerson2('LiLi', 14);

console.log(ChinesePerson);
console.log(ChinesePerson2);
console.log(person1);
console.log(person2);
```

## softBind （软绑定）

```js
function softBind(ctx, ...args) {
  const fn = this;

  const bound = function () {
    /* => 判断如果应用了默认绑定（即 this 指向了 window （非严格模式下）或 undefined （严格模式下）），则绑定成传入的上下文 ctx */
    return fn.apply(!this || this === window ? ctx : this, args);
  };

  bound.prototype = Object.create(fn.prototype);

  return bound;
}

Function.prototype.softBind = softBind;

function foo() {
  console.log(this.name);
}

var obj1 = { name: '1' };
var obj2 = { name: '2' };
var obj3 = { name: '3' };

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
```

## instanceof

```js
/* 参数：L -- 左表达式，R -- 右表达式 */
function MyInstanceof(L, R) {
  const rightVal = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) return false;
    if (L === rightVal) return true;

    L = L.__proto__;
  }
}

/* 有问题 */
console.log(MyInstanceof(1, Object));
```

## ForEach

```js
function MyEach(callback) {
  if (Array.isArray(this)) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  }
}

Array.prototype.MyEach = MyEach;

const arr = [2, 3, 455, 6233];
arr.MyEach((item, index, currentArr) => {
  console.log(item, index, currentArr);
});
```

## replace

```js
function myReplace(reg, callback) {
  const handler = (str, oldVal, newVal) => {
    const index = str.indexOf(oldVal);
    return str.substring(0, index) + newVal + str.substring(index + oldVal.length);
  };

  /* => 备份调用者、判断是否含有模式g、捕获组（捕获不到则为null） */
  let [cloneStr, isGlobal, arr] = [this.slice(0), reg.global, reg.exec(this)];

  while (arr) {
    const [res, [content]] = [callback(...arr), arr];
    cloneStr = handler(cloneStr, content, res);
    arr = reg.exec(this);

    if (!isGlobal) break;
  }

  return cloneStr;
}

String.prototype.myReplace = myReplace;

const str = '{0}年{1}月{2}日';
const arr = [2020, 03, 20];
const newStr = str.myReplace(/\{(\d)\}/g, (content, group) => `#${arr[group]}`);
console.log(newStr);
```

## Promise

```javascript
// 状态值：pending、fulfilled、rejected
const PENDING = 'pending'; // => 等待态
const FULFILLED = 'fulfilled'; // => 成功态
const REJECTED = 'rejected'; // => 失败态

const ERROR = '不能返回Promise本身，否则会造成循环引用，无限递归';

const resolvePromise = (newPromise, x, resolve, reject) => {
  // 判断是否为同一个，不能返回Promise本身，否则会造成循环引用，无限递归
  if (newPromise === x) return reject(new TypeError(ERROR));

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called;

    try {
      const then = x.then;

      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;

            resolvePromise(newPromise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;

            reject(r);
          },
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;

      reject(e);
    }
  } else {
    resolve(x);
  }
};

const isPromise = (x) => {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    return typeof x.then === 'function';
  }
  return false;
};

class MyPromise {
  constructor(executor) {
    // 状态，默认为 pending
    this.status = PENDING;

    // 成功的结果
    this.value = undefined;

    // 失败的原因
    this.reason = undefined;

    // 成功的池子
    this.resolveArray = [];

    // 失败的池子
    this.rejectArray = [];

    // 成功的回调
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        // 发布
        this.resolveArray.forEach((fn) => fn());
      }
    };

    // 失败的回调
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        // 发布
        this.rejectArray.forEach((fn) => fn());
      }
    };

    try {
      // 立即执行
      executor(resolve, reject);
    } catch (e) {
      // 异常则执行错误的回调
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (val) => {
            throw val;
          };

    const newPromise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // 订阅
      if (this.status === PENDING) {
        this.resolveArray.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.rejectArray.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return newPromise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    /* const P = this.constructor;
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason =>
        P.resolve(callback()).then(() => {
          throw reason;
        }),
    ); */
    return this.then(
      (value) => {
        callback();
        return value;
      },
      (reason) => {
        callback();
        return reason;
      },
    );
  }

  // TODO ...
  /*
   * 该Promise.allSettled()方法返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果。
   * 它当前处于 TC39 第四阶段草案（Stage 4）
   */
  allSettled() {}

  static promisify(fn) {
    return (...args) =>
      new MyPromise((resolve, reject) => {
        fn(...args, (err, data) => {
          if (err) reject();
          resolve(data);
        });
      });
  }

  // TODO...
  /*
   * Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 完成，就返回那个已经有完成值的 promise 。
   * 如果可迭代对象中没有一个 promise 完成（即所有的 promises 都失败/拒绝），就返回一个拒绝的 promise，返回值还有待讨论：
   * 无非是拒绝原因数组或AggregateError类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。
   * 本质上，这个方法和Promise.all()是相反的。
   *
   * 注意！ Promise.any() 方法依然是实验性的，尚未被所有的浏览器完全支持。它当前处于 TC39 第三阶段草案（Stage 3）
   */
  static any() {}

  static all(promises) {
    if (!Array.isArray(promises)) throw new TypeError('Iterable Is Not Array');
    return new MyPromise((resolve, reject) => {
      const results = [];
      let count = 0;

      const processData = (i, data) => {
        results[i] = data;
        if (++count === promises.length) {
          resolve(results);
        }
      };

      promises.forEach((promise, index) => {
        let item = promises[index];
        if (isPromise(item)) {
          promise.then((data) => {
            processData(index, data);
          }, reject);
        } else {
          processData(index, item);
        }
      });
    });
  }

  static race(promises) {
    if (!Array.isArray(promises)) throw new TypeError('Iterable Is Not Array');
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (isPromise(value)) {
        return value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      if (isPromise(reason)) {
        return reason.then(resolve, reject);
      } else {
        reject(reason);
      }
    });
  }
}

/* 单元测试 */
MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
```

## 数组扁平化

```javascript
/* 数组扁平化（平铺） */
let arr = [[1, 2, 2], [2, 33, 4, 5, 4], [2, 34, 5, [11, 22, [22, 33, [42]]]], 12];

/* --------------------------------------------- */

/* Flat */
const newArr = arr.flat(Infinity);

/* --------------------------------------------- */

/* 转换为字符串 */
const newBrr = arr
  .toString()
  .split(',')
  .map((item) => Number(item));

const newCrr = JSON.stringify(arr)
  .replace(/(\[|\])/g, '')
  .split(',')
  .map((item) => Number(item));

/* --------------------------------------------- */

/* 循环判断是否为数组 */
while (arr.some((item) => Array.isArray(item))) {
  arr = [].concat(...arr);
}

/* --------------------------------------------- */

function myFlat() {
  const newArr = [];
  const fn = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        fn(arr[i]);
        continue;
      }
      newArr.push(arr[i]);
    }
  };
  fn(this);
  return newArr;
}
Array.prototype.myFlat = myFlat;

/* --------------------------------------------- */
```

## Array.reduce

## Ajax

## 防抖 控制事件触发频率的方法（输入框持续输入模糊查找、onScroll、多次触发事件）

```HTML
<button id="btn">点我防抖(debounce)</button>
```

```js
/* 防抖：类似 setTimeout。只维护一个定时器
 * 1.在持续触发事件时，在一定时间后没有再触发事件，就执行事件处理函数
 * 2.如果在设定时间到来之前又触发了事件，则重新计时
 * 3.立即执行版：连续触发事件后，马上执行第一次，之后就不会再执行
 * 4.非立即执行版：连续触发事件后，只执行最后一次事件处理函数
 */
const btn = document.getElementById('btn');

const success = () => {
  console.log('触发了');
};

/* => 1.创建防抖函数 */
const debounce = (fn, delay) => {
  let timer = null;

  /* => 2.返回一个函数 */
  return (...args) => {
    timer && clearTimeout(timer);

    /* => 3.设置定时器定时调用回调函数 */
    timer = setTimeout(() => {
      /* => 4.绑定上下文与传入参数 */
      fn.apply(this, args);
    }, delay);
  };
};

btn.addEventListener('click', debounce(success, 2000));
```

## 节流 控制事件触发频率的方法

```HTML
<button id="btn">点我节流(throttle)</button>
```

```js
/* 节流：类似 setInterval。维护多个定时器
 * 1.在持续触发事件时，在一定时间内只触发一次事件处理函数
 * 2.如果在事件处理函数执行完之前又触发了事件，则会被阻止
 */
const btn = document.getElementById('btn');

const success = () => {
  console.log('触发了');
};

/* => 1.创建节流函数 */
const throttle = (fn, delay) => {
  /* => 2.设置一个标记 */
  let flag = true;

  /* => 3.返回一个函数 */
  return (...args) => {
    /* => 4.如果标记为 false 禁止往下执行 */
    if (!flag) return;

    /* => 5.如果标记为 true 则改变标记状态，往下执行 */
    flag = false;

    /* => 6.执行定时器 */
    setTimeout(() => {
      /* => 7.绑定上下文与传入参数 */
      fn.apply(this, args);

      /* => 8.当回调函数执行完成后改变标记状态 */
      flag = true;
    }, delay);
  };
};

btn.addEventListener('click', throttle(success, 3000));
```

## 原型链继承

## 通用类型检测

```javascript
/* Object.prototype.toString.call() 形式 */
const typeGather = Object.create(null);
const typeFuncs = Object.create(null);
const toString = Object.prototype.toString;

/* 原始类型 */
Reflect.set(typeGather, 'isNull', 'Null');
Reflect.set(typeGather, 'isNumber', 'Number');
Reflect.set(typeGather, 'isString', 'String');
Reflect.set(typeGather, 'isSymbol', 'Symbol');
Reflect.set(typeGather, 'isBoolean', 'Boolean');
Reflect.set(typeGather, 'isUndefined', 'Undefined');

/* 内置对象 or 引用类型 */
Reflect.set(typeGather, 'isSet', 'Set');
Reflect.set(typeGather, 'isMap', 'Map');
Reflect.set(typeGather, 'isMath', 'Math');
Reflect.set(typeGather, 'isJSON', 'JSON');
Reflect.set(typeGather, 'isDate', 'Date');
Reflect.set(typeGather, 'isError', 'Error');
Reflect.set(typeGather, 'isArray', 'Array');
Reflect.set(typeGather, 'isRegExp', 'RegExp');
Reflect.set(typeGather, 'isWindow', 'Window');
Reflect.set(typeGather, 'isObject', 'Object');
Reflect.set(typeGather, 'isFunction', 'Function');

/* 遍历生成方法 */
Reflect.ownKeys(typeGather).forEach((key) => {
  typeFuncs[key] = (val) => toString.call(val) === `[object ${Reflect.get(typeGather, key)}]`;
});

console.log(typeFuncs.isNull(null)); // => "[object Null]"
console.log(typeFuncs.isNumber(123)); // => "[object Number]"
console.log(typeFuncs.isNumber(NaN)); // => "[object Number]"
console.log(typeFuncs.isString('str')); // => "[object String]"
console.log(typeFuncs.isBoolean(true)); // => "[object Boolean]"
console.log(typeFuncs.isUndefined(undefined)); // => "[object Undefined]"
console.log(typeFuncs.isSymbol(Symbol('Symbol'))); // => "[object Symbol]"

console.log(typeFuncs.isDate(new Date())); // => "[object Date]"
console.log(typeFuncs.isRegExp(/^hello/)); // => "[object RegExp]"
console.log(typeFuncs.isArray(['/^hello/'])); // => "[object Array]"
console.log(typeFuncs.isFunction(Window)); // => "[object Function]"
console.log(typeFuncs.isFunction(() => {})); // => "[object Function]"
console.log(typeFuncs.isFunction(function () {})); // => "[object Function]"
console.log(typeFuncs.isObject({ name: 'zhenzhen' })); // => "[object Object]"

console.log(typeFuncs.isMath(Math)); // => "[object Math]"
console.log(typeFuncs.isSet(new Set())); // => "[object Set]"
console.log(typeFuncs.isMap(new Map())); // => "[object Map]"
console.log(typeFuncs.isWindow(this)); // => "[object Window]"
console.log(typeFuncs.isWindow(window)); // => "[object Window]"
console.log(typeFuncs.isJSON(JSON)); // => "[object JSON]"
console.log(typeFuncs.isError(new Error())); // => "[object Error]"

/* 柯里化形式 */
```

## JSONP

```javascript
/* 后端服务 */
const express = require('./node_modules/express');
const app = express();

app.get('/jsonp', (req, res) => {
  const { msg, cb } = req.query;
  console.log(msg);
  console.log(cb);
  res.end(`${cb}({msg:'Yes'})`);
});

app.listen(3344);
```

```javascript
/* 前端实现 */
/*
 * 缺点:
 * 1.只支持Get请求
 * 2.不安全，容易遭受xss攻击
 */
function jsonp({ url, params, cb }) {
  // => 1.返回一个Promise
  return new Promise((resolve, reject) => {
    // => 2.创建script标签
    const script = document.createElement('script');

    // => 3.给全局对象添加一个属性，值为一个回调函数，并且把返回的数据resolve出去
    window[cb] = function (data) {
      resolve(data);

      // => 4.用完即删
      document.body.removeChild(script);
    };

    // => 5.整合参数
    params = { ...params, cb };
    const arr = [];
    for (const key in params) {
      arr.push(`${key}=${params[key]}`);
    }

    // => 6.拼接URL
    script.src = `${url}?${arr.join('&')}`;

    // => 7.将script添加到页面实现跨域请求
    document.body.appendChild(script);
  });
}

jsonp({
  url: 'http://localhost:3344/jsonp',
  params: { msg: 'Hello' },
  cb: 'cross',
}).then((data) => console.log(data));
```

## isNaN

## Array.push

## 数组去重

```javascript
/* 数组去重 */
let arr = [12, 23, 12, 15, 25, 23, 25, 14, 16];
let len = arr.length;

/* --------------------------------------------- */

/* Set 利用Set集合的特性 */
let newArr = [...new Set(arr)];
let newBrr = Array.from(new Set(arr));

/* --------------------------------------------- */

/* For 双重for循环 */
for (let i = 0; i < len; i++) {
  for (let j = i + 1; j < len; j++) {
    if (arr[i] === arr[j]) {
      arr.splice(i, 1); // 需减一，否则造成数组塌陷
      j--;
    }
  }
}

/* --------------------------------------------- */

/* Object 利用对象中属性的唯一性 */
let objArr = {};
const newDrr = [];

for (let i = 0; i < len; i++) {
  const item = arr[i];
  objArr[item] = item;
}

for (const key in objArr) {
  newDrr.push(objArr[key]);
}

objArr = null;

/* --------------------------------------------- */

/* RegExp 正则匹配方式 相邻项 */
const newErr = [];

// 升序排序
arr.sort((a, b) => a - b);

// 拆分数组并且每项后面拼接一个字符串
const strArr = arr.join('@') + '@';

// 正则：以数字开头+@符结尾，捕获0 - N 次
const reg = /(\d+@)\1*/g;

// 替换
strArr.replace(reg, (whole, part) => {
  newErr.push(parseFloat(part));
});

/* --------------------------------------------- */
```

## 克隆

```javascript
var obj = {
  a: 100,
  b: [10, 20, 30],
  c: { x: 111 },
  d: /^\d+$/,
  e: function () {
    console.log(1);
  },
};

var arr = [10, [100, 200], { x: 10, y: 20 }];

// 浅克隆，但会忽略null、函数、正则、日期
var cloneObj = JSON.parse(JSON.stringify(obj));

// 浅克隆，引用类型的数据仍然指向的是同一个
var newObj = {};
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    newObj[key] = obj[key];
  }
}
newObj.c.x = 222; // => obj.c.x 也变成了222

/* 深克隆 */
function clone(data, deep) {
  var copy = new data.constructor();
  if (deep) {
    if (data === null) return null;
    if (typeof data !== 'object') return data;
    if (data instanceof RegExp) return new RegExp(data);
    if (data instanceof Date) return new Date(data);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        copy[key] = clone(data[key], deep);
      }
    }
  }
  return copy;
}
```

## 回文数

## 懒加载

## async / await

## 数组排序（冒泡排序、插入排序、快速排序、选择排序（待实现））

```javascript
/* 数组排序 */
let arr = [12, 23, 12, 15, 1, 25, 23, 25, 14, 16];

/* --------------------------------------------- */

/* 冒泡排序 */
function bubbleSort(array) {
  let temp;
  const len = array.length;

  // len - 1 排序的最大轮数
  for (let i = 0; i < len - 1; i++) {
    // len - 1 - i 减去已排序的轮数
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

/* --------------------------------------------- */

/* 插入排序 */
function insertionSort(array) {
  // 新建容器
  const newArr = [];

  // 先取第一项
  newArr.push(array[0]);

  // 从第二项开始取
  for (let i = 1; i < array.length; i++) {
    // 从新容器的末尾开始比较
    for (let j = newArr.length - 1; j >= 0; j--) {
      // 如果原数组中取出的项大于新容器中取出的项
      if (array[i] > newArr[j]) {
        // 在新容器的当前项的下一个位置插入原数组中取出的当前项
        newArr.splice(j + 1, 0, array[i]);

        // 结束本层循环，并跳到外层循环进行下一轮循环
        break;
      }

      // 如果以上规则不符合，则匹配到了第一项，在第一个位置插入
      if (j === 0) {
        newArr.unshift(array[i]);
      }
    }
  }

  return newArr;
}

/* --------------------------------------------- */

/* 快速排序 */
function quickSort(array) {
  // 如果数组长度小于等于1，结束递归
  if (array.length <= 1) return array;

  // 取出数组中间项
  const midIndex = Math.floor(array.length / 2);
  const midValue = array.splice(midIndex, 1)[0];

  // 创建左右两个数组
  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    // 如果当前项小于数组中间项，则放在左数组，否则放在右数组
    item < midValue ? leftArr.push(item) : rightArr.push(item);
  }

  // 递归处理左右数组，并且按照左中右的方式连接返回的数组
  return quickSort(leftArr).concat(midValue, quickSort(rightArr));
}

/* --------------------------------------------- */
```

## JSON 序列化反序列化

## 一键粘贴功能：使用事件（onselet、oncopy、oncut、onpaste）

## 阿里巴巴测评题

```javascript
/**
 * 使用硬币来凑成指定的金额
 *
 * 说明：给定不同面额的硬币 coins 和一个总金额 amount，
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数，
 * 如果没有任何一种硬币组合能组成总金额，返回 -1，
 * 你可以认为每种硬币的数量是无限的。
 *
 * 示例：
 * coinChange([1, 2, 5], 11); // 3
 * coinChange([2, 4], 3); // -1
 */
coinChange([1, 2, 5], 11);
function coinChange(coins: Array<number>, amount: number): number {
  /** TODO:代码实现 */

  if (Array.isArray(coins)) {
    coins.forEach((item) => {});
  } else {
    console.log('conins 不是一个数组~');
  }
  return 1;
}

/**
 * 价格数组转换成可读性更好的文本序列
 * 说明：有个数组，内部是。
 * 示例：
 * var input = [
 * {
 * "moqPe": 5,
 * "pricePe": 12.85
 * },
 * {
 * "moqPe": 15,
 * "pricePe": 11.36
 * }
 * ]
 * var output = rangeStringify(input);
 *
 * // output: "¥12.85 (5-15); ¥11.36 (≥15个)"
 */
var input = [
  {
    moqPe: 5,
    pricePe: 12.85,
  },
  {
    moqPe: 15,
    pricePe: 11.36,
  },
];

// console.log(rangeStringify(input));

function rangeStringify(input: Array<any>): string {
  /* TODO: 代码实现 */
  let str: string;
  input.forEach((item) => {
    const moqPe = item.moqPe;
    const pricePe = item.pricePe;
    if (moqPe < 5) {
      str += `¥${pricePe}（<5）;`;
    } else if (moqPe < 15 && moqPe >= 5) {
      str += `¥${pricePe}（5-15）;`;
    } else if (moqPe >= 15) {
      str += `¥${pricePe}（≥15个）;`;
    }
  });
  return str;
}

/**
 * 字符串隐藏部分内容
 * 说明：实现一个方法，接收一个字符串和一个符号，将字符串中间四位按指定符号隐藏
 * 1. 符号无指定时使用星号（*）
 * 2. 接收的字符串小于或等于四位时，返回同样长度的符号串，等同于全隐藏，如 123，隐藏后是 ***
 * 3. 字符串长度是大于四位的奇数时，如 123456789，隐藏后是 12****789，奇数多出来的一位在末尾
 * 示例：
 * mask('alibaba', '#'); // a####ba
 * mask('85022088'); // 85****88
 * mask('hello'); // ****o
 * mask('abc', '?'); // ???
 * mask('阿里巴巴集团', '?'); // 阿????团
 */

console.log(mask('alibaba', '#'));
console.log(mask('85022088'));
console.log(mask('hello'));
console.log(mask('abc', '?'));
console.log(mask('阿里巴巴集团', '?'));

function mask(str: string, char: string = '*'): string {
  /* TODO:代码实现 */

  let newStr: string;
  const length = str.length;

  if (length <= 4) {
    // 不懂 使用字符串方法 repeat() 编译过程报错，但能编译成功
    newStr = char.repeat(str.length);
  } else if (length > 4) {
    // 总长度减去4位隐藏符号 -- 剩余长度
    const surplusLength = length - 4;
    // 重复4位隐藏符号
    const char4 = char.repeat(4);

    if (length % 2 === 0) {
      // 偶数
      newStr = str.substr(0, surplusLength / 2) + char4 + str.substr(-(surplusLength / 2));
    } else {
      // 奇数
      if (surplusLength <= 1) {
        newStr = str.substr(0, (surplusLength % 2) - 1) + char4 + str.substr(-(surplusLength % 2));
      } else {
        newStr = str.substr(0, surplusLength % 2) + char4 + str.substr(-(surplusLength % 2) - 1);
      }
    }
  }
  return newStr;
}

/** 使用组合设计模式
 * 平铺节点数组转嵌套树
 * 说明：将一个包含深度信息的节点数组转换成一棵树，要求只能遍历一次该数组
 * 输入值：TreeNode数组 TreeNode为包含title, depth(正整数，深度不限)字段的Object
 * 输出值：组装好的嵌套树，子节点挂载在对应父节点的children字段上

举例 (title字段仅为便于理解，实际无固定规则)
输入：[
  { title: '1', depth: 1 },
  { title: '1-1', depth: 2 },
  { title: '1-1-1', depth: 3 },
  { title: '1-1-2', depth: 3 },
  { title: '1-2', depth: 2 },
  { title: '2', depth: 1 },
  { title: '2-1', depth: 2 },
]
输出：[
  {
    "title": "1",
    "depth": 1,
    "children": [
      {
        "title": "1-1",
        "depth": 2,
        "children": [
          {
            "title": "1-1-1",
            "depth": 3
          },
          {
            "title": "1-1-2",
            "depth": 3
          }
        ]
      },
      {
        "title": "1-2",
        "depth": 2
      }
    ]
  },
  {
    "title": "2",
    "depth": 1,
    "children": [
      {
        "title": "2-1",
        "depth": 2
      }
    ]
  }
]
*/
const arr = [
  { title: '1', depth: 1 },
  { title: '1-1', depth: 2 },
  { title: '1-1-1', depth: 3 },
  { title: '1-1-2', depth: 3 },
  { title: '1-2', depth: 2 },
  { title: '2', depth: 1 },
  { title: '2-1', depth: 2 },
];
depthArray2Tree(arr);

function depthArray2Tree(depthArray: Array<any>): Array<any> {
  /* TODO: code */
  // 1.计算 depth 相同的数字，相同的代表为同级
  // 2.计算 title 中含有 - 的个数，0个代表第1级，1个代表第2级，以此类推
  // 3.根据 - 的个数区分父子级

  // 按depth 从小到大 排序
  depthArray.sort((a, b) => a.depth - b.depth);

  const newArr = [];
  const length = depthArray.length;

  // 1
  for (let i = 0; i < length; i++) {
    if (depthArray[i].depth === depthArray[i + 1].depth) {
      newArr.push(depthArray[i]);
      newArr.push(depthArray[i + 1]);
    }
  }

  return newArr;
}
```

## 链式调用

```js
var a = obj(1);
var b = a.add(2);
var c = b.add(3);
// a 里面有 1，b 里面有 1，2，c 里面有 1，2，3
```

```js
class File {
  constructor(val) {
    this.val = val;
    this.parent = [];
  }

  add(file) {
    file.parent.push(this.val);

    this.parent.length != 0 && file.parent.push(...this.parent);

    return file;
  }
}

var a = new File(1);
var b = a.add(new File(2));
var c = b.add(new File(3));
var d = c.add(new File(4));
var e = d.add(new File(5));
var f = e.add(new File(6));

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
console.log(f);
```

## 新题

一，用正则表达式来将字符串"I? love ?? the ?great ? ?wall in ?beijing"更改为："I love the Great Wall in Beijing"，主要是为了解决编码的问题导致的问题，规律：

1，乱码只有两种特殊字符分别是'?'和' ';

2，如果乱码的末尾是'?'则它的下一位字母肯定是大写；

### 实现将一个空数组 [] 赋值成 [0, 2, 4, 6, 8, ..., 10, 100]

```js
// 不使用类似 for，while 循环控制语句和 js 本身自带方法（如：forEach）的情况下，范围 0-100 便可。
```

```js
const ary = [];
ary[0] = 0;

function evenAry(ary) {
  ary[ary.length] = ary[ary.length - 1] + 2;

  ary[ary.length - 1] < 100 && evenAry(ary);

  return ary;
}

evenAry(ary);
console.log(ary);
```

三，设计一个自由可灵活配置的时间调度器，有 a,b,c,d...很多个需要被调度的方法（方法名称的命名可随意），调度有两种形式，一个是顺序调用（例如调度完 a 后才能调度 b），一个是间隔某个时间进行循环调度。用一个统一的方法进行封装可以实现下列的例子：

1，可以为 5 秒后调用 a,3 秒后调用 b，10 秒后调用。c...z 方法不执行（不执行的方法可以设计成不传递参数），那么在第 14 秒的时候开始重新从 0 秒循环，又变成第一秒后调用 a,3 秒后调用 b，这样循环往复；

2，每间隔 6 秒调用一次 a,每间隔 4 秒调用一次 b，c...z 方法不执行；

3，第一秒先执行 a，3 秒后执行 b，但是 c 却是每间隔 3 秒执行一次，d 是每间隔 4 秒执行一次，a 和 b 是每 4 秒进行一次循环；

4，a 不执行，b 和 c 每间隔 3 秒执行一次，d 不执行；

## 原生实现两个大数加减乘除

```js
function addMaxNum(num1, num2, action) {
  return Number(eval(`${BigInt(num1)}${action}${BigInt(num2)}`));
}
console.log(addMaxNum('9997492547350994', '9997399254750995', '+').toLocaleString());
```

## 递归思想

```js
// 不使用类似 for ， while 循环控制语句和 js 本身自带方法（如：forEach）的情况下，实现将一个空数组 [] 赋值成 [0,2,4,6,8,10,...,100] ，范围 0-100 便可。
const ary = [];
ary[0] = 0;

function evenAry(ary) {
  ary[ary.length] = ary[ary.length - 1] + 2;

  ary[ary.length - 1] < 100 && evenAry(ary);

  return ary;
}

evenAry(ary);
console.log(ary);
```
