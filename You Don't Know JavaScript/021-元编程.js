/* 推导函数名称 name */
var a = function () {};
var b = function bar() {};
function foo() {}

console.log(a.name); // a
console.log(b.name); // b
console.log(foo.name); // foo

// 1.Symbol.toPrimitive
var arr = [1, 2, 3, 4, 5];
console.log(arr + 10); // 1,2,3,4,510 | arr 先转换为字符串再进行拼接

arr[Symbol.toPrimitive] = function (hint) {
  // hint: number(*) / string(String()) / default(+)
  if (hint == 'default' || hint == 'number') {
    return this.reduce((prev, curr) => prev + curr, 0);
  }
};
console.log(arr + 10); // 25  = 15 + 10
console.log(arr * 10); // 150 = 15 * 10

// 2.Symbol.isConcatSpreadable ：指示传给 concat 方法的数组是否将其展开
var ary = [1, 2, 3];
var bry = [4, 5, 6];
var cry = [].concat(ary, bry);
console.log(cry); // [ 1, 2, 3, 4, 5, 6 ]

bry[Symbol.isConcatSpreadable] = false;
var cry = [].concat(ary, bry);
console.log(cry); // [ 1, 2, 3, [ 4, 5, 6, [Symbol(Symbol.isConcatSpreadable)]: false ] ]

// 3.Symbol.unscopables ：指示哪些属性不暴露给 with 语句的词法作用域
var obj = { a: 1, b: 2, c: 3 };
var a = 10;
var b = 20;
var c = 30;

obj[Symbol.unscopables] = {
  a: false, // 为可暴露
  b: true, // 为不可暴露
  c: false,
};

with (obj) {
  console.log(a, b, c); // 1 20 3 | b 为不可暴露，所以查找的是全局变量 b
}

/* Proxy */
// 1.可取消代理
var obj = { name: 'zhenzhen' };
var handlers = {
  get(target, key, context) {
    console.log('Accessing: ', key);
    return Reflect.get(target, key, context);
  },
};

var result = Proxy.revocable(obj, handlers);
console.log(result); // { proxy: { name: 'zhenzhen' }, revoke: [Function] }
console.log(result.proxy.name); // zhenzhen

// 取消代理
result.revoke();
console.log(result.proxy.name); // TypeError: 无法在已撤销的代理上执行'get'

// 2.代理在先：代理与目标交互。为代理对象添加特殊的规则，而目标对象则没有
var messages = [];
var handlers = {
  get(target, key) {
    console.log(target, key);
    if (typeof target[key] == 'string') {
      return target[key].replace(/[^\w]/g, '');
    }

    return target[key];
  },
  set(target, key, val) {
    console.log(target, key, val);
    if (typeof val == 'string') {
      val = val.toLowerCase();
      if (target.indexOf(val) == -1) {
        target.push(val.toLowerCase());
      }
    }

    return true;
  },
};

var proxy = new Proxy(messages, handlers);
proxy.push('HellO...', 42, 'WORld!!', 'wOrLd!!');
console.log(messages);

proxy.forEach((v) => {
  console.log(v);
});

// 3.代理在后：目标与代理交互。代理作为最后的保障
var handlers = {
  get(target, key, context) {
    return function () {
      context.speak(key + '!');
    };
  },
};

var catchall = new Proxy({}, handlers);
var greeter = {
  speak(who = 'someone') {
    console.log('Hello ', who);
  },
};

Object.setPrototypeOf(greeter, catchall);
greeter.speak(); // Hello  someone
greeter.speak('zhenzhen'); // Hello  zhenzhen
greeter.say('xiaozhenzhen'); // Hello  say! | 没有找到则去原型去找，然后被 get 拦截返回函数执行

// 4.模拟原型链
var handlers = {
  get(target, key, context) {
    if (Reflect.has(target, key)) {
      return Reflect.get(target, key, context);
    } else {
      // 找不到就去 [[Prototype]] 属性上的对象找
      return Reflect.get(target[Symbol.for('[[Prototype]]')], key, context);
    }
  },
};

var proxy = new Proxy(
  {
    name: 'zhenzhen-1',
    foo() {
      console.log('foo: ', this.name);
    },
  },
  handlers,
);

// proxy2 的原型是 proxy
var proxy2 = Object.assign(Object.create(proxy), {
  name: 'zhenzhen-2',
  bar() {
    console.log('bar: ', this.name);
    this.foo();
  },
});

proxy[Symbol.for('[[Prototype]]')] = proxy2;

proxy.bar(); // bar:  zhenzhen-1 | foo:  zhenzhen-1
proxy2.foo(); // foo:  zhenzhen-2

/* 属性排序 */
// 1.OwnPropertyKeys 算法 适用于 Reflect.ownKeys() / Object.getOwnPropertyNames() / Object.getOwnPropertySymbols() / Object.keys()
// 先按数字升排序
// 然后按创建顺序排序字符串属性
// 最后按创建顺序排序 Symbol 属性
var obj = {};
obj[Symbol('c')] = 'yay';
obj[2] = '2';
obj[1] = '1';
obj.b = 'b';
obj.a = 'a';

console.log(Reflect.ownKeys(obj)); // [ '1', '2', 'b', 'a', Symbol(c) ]
console.log(Object.getOwnPropertyNames(obj)); // [ '1', '2', 'b', 'a' ]
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(c) ]
