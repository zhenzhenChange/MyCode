// Proxy 代理/拦截

/**
 * 生成 Proxy 实例
 *
 * 必须针对 Proxy 实例进行操作，定义的行为才起作用
 *
 * @param target  所要拦截的目标对象
 * @param handler 定义拦截行为的对象
 */
const proxy = new Proxy(
  {},
  {
    get(target, key) {
      return 'Proxy';
    },
  },
);

console.log(proxy.A); // Proxy
console.log(proxy.B); // Proxy

/* ------------------------------------------- */

// 必须针对 Proxy 实例进行操作，定义的行为才起作用
const obj = {
  name: 'zhenzhen',
};

const proxy = new Proxy(obj, {
  get(target, key) {
    return 'Hello ' + target[key];
  },
});

console.log(obj);
console.log(proxy);
console.log(obj.name); //zhenzhen
console.log(proxy.name); // Hello zhenzhen

/* ------------------------------------------- */

// Proxy 实例作为对象的原型
const obj = {
  name: 'zhenzhen',
};

const proxy = new Proxy(obj, {
  get(target, key) {
    return 'Hello ' + target[key];
  },
});

const newObj = Object.create(proxy);
console.log(newObj.name); // Hello zhenzhen

/* ------------------------------------------- */

// Proxy 支持的所有拦截操作 - 对可以设置但没有设置拦截的操作，则直接作用与源对象上
const obj = { ou: 'zhenzhen' };
const ary = ['a', 2, 444];
const proxy = new Proxy(ary, {
  /**
   * 拦截对象属性的读取
   *
   * @param {*} target    目标对象
   * @param {*} key       将要读取的属性
   * @param {*} receiver
   */
  get(target, key, receiver) {
    /* 定义读取拦截，若对象上没有该属性，则抛出错误（不设置默认则返回 undefined ）
      if (Reflect.has(target, key)) return Reflect.get(target, key, receiver);
      throw `No The Key In Target`; 
    */
    /* 拦截数组负数索引读取（倒数读取）
      if (key < 0) key = target.length + Number(key);
      return Reflect.get(target, key, receiver); 
    */
  },

  // 拦截对象属性的设置
  set() {},

  // 拦截对象属性的检测
  has() {},

  // 拦截对象属性的删除
  deleteProperty() {},

  // 拦截对象属性的枚举
  ownKeys() {},

  // 拦截对象属性的描述对象
  getOwnPropertyDescriptor() {},

  // 拦截对象属性的定义
  defineProperty() {},

  // 拦截对象不可扩展的设置
  preventExtensions() {},

  // 拦截对象原型的读取
  getPrototypeOf() {},

  // 拦截对象不可扩展的读取
  isExtensible() {},

  // 拦截对象原型的设置
  setPrototypeOf() {},

  /**
   * 拦截函数调用
   * @param {*} target  目标函数
   * @param {*} ctx     函数上下文
   * @param {*} args    函数参数数组
   */
  apply(target, ctx, args) {},

  // 拦截函数构造调用
  construct() {},
});

// console.log(proxy.ou); // zhenzhen
// console.log(proxy.zhenzhen); // throw `No The Key In Target`
// console.log(proxy[-1]); // 444

/* ------------------------------------------- */

// get

global.pow = (val) => val * val;
global.double = (val) => val * 2;
global.reverse = (val) => [...String(val)].reverse().join('');

// 拦截 get 链式调用
function pipe(value) {
  return function () {
    const ary = [];
    const proxy = new Proxy(
      {},
      {
        get(target, key, receiver) {
          if (key === 'get') return ary.reduce((prev, curr) => curr(prev), value);

          ary.push(global[key]);

          return proxy;
        },
      },
    );

    return proxy;
  };
}

console.log(pipe(3)().double.pow.reverse.get);

// 拦截 get 实现通用 DOM 结构生成函数
const domCreate = new Proxy(
  {},
  {
    get(target, key, receiver) {
      return function (attrs, ...children) {
        const el = document.createElement(key);

        Object.keys(attrs).forEach((attr) => el.setAttribute(attr, attrs[attr]));

        children.forEach((child) => {
          let childEl = '';

          if (typeof child == 'string') childEl = document.createTextNode(child);
          else childEl = child;

          el.appendChild(childEl);
        });

        return el;
      };
    },
  },
);

const dom = domCreate.div(
  {},
  'My Name is',
  domCreate.a({ href: 'http://baidu.com' }, 'zhenzhen.'),
  'I Like: ',
  domCreate.ul({}, domCreate.li({}, 'Game'), domCreate.li({}, 'Music'), domCreate.li({}, 'Book')),
);

console.log(dom);

// 若对象的属性是不可配置、不可写的，则该属性不能被代理操作，只能通向源对象操作
const obj = { foo: '123' };
const target = Object.defineProperty(obj, 'foo', {
  writable: false,
  configurable: false,
});

const proxy = new Proxy(target, {
  // get: (target, key) => 'aaa', // Error
  get: (target, key) => target[key], // Success
});

console.log(proxy.foo); // TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '123' but got 'aaa')
console.log(proxy.foo); // 123

/* ------------------------------------------- */

// set

// 数据验证
const proxy = new Proxy(
  {},
  {
    set(target, key, value) {
      if (typeof value != 'number' || value > 200) throw 'Value Error';
      Reflect.set(target, key, value);
    },
  },
);

proxy.age = 33; // Success
proxy.age = '33'; // throw Value Error
proxy.age = 333; // throw Value Error

// 内部属性拦截
const proxy = new Proxy(
  {},
  {
    get(target, key) {
      if (key.startsWith('_')) throw new Error(`Get Error`);
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      if (key.startsWith('_')) throw new Error(`Set Error`);
      Reflect.set(target, key, value);
    },
  },
);

// console.log(proxy._abc); // Error: Get Error
proxy._xyz = 1; // Error: Set Error

/* ------------------------------------------- */

// apply

function fn() {
  return 'fn';
}

const proxy = new Proxy(fn, {
  apply(target, ctx, args) {
    return 'proxy';
  },
});

console.log(proxy()); // proxy

// apply / call / Reflect.apply 皆被拦截
function sum(n1, n2) {
  return n1 + n2;
}

const proxy = new Proxy(sum, {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  },
});

console.log(proxy(1, 2)); // 6
console.log(proxy.call(null, 3, 4)); // 14
console.log(proxy.apply(null, [5, 6])); // 22
console.log(Reflect.apply(proxy, null, [7, 8])); // 30

/* ------------------------------------------- */

// has - 只对 in 运算符生效，对 for ... in 无效

const proxy = new Proxy(
  {
    foo: 'zzz',
    _zzz: '___',
  },
  {
    has(target, key) {
      if (key.startsWith('_')) return false;
      return Reflect.has(target, key);
    },
  },
);

console.log(Reflect.has(proxy, 'foo')); // true
console.log(Reflect.has(proxy, '_zzz')); // false

/* ------------------------------------------- */

// construct - 拦截 new 操作，必须返回一个对象。原生 new 操作符返回 this 代表当前对象，原始类型会被忽略

const proxy = new Proxy(function () {}, {
  construct(target, args, newTarget) {
    // return 1;
    return { value: 1 };
  },
});

// console.log(new proxy()); // TypeError: 'construct' on proxy: trap returned non-object ('1')
console.log(new proxy()); // { value: 1 }

/* ------------------------------------------- */

// deleteProperty - 拦截 delete 操作，若该方法返回 false 或抛出错误，则无法删除
const proxy = new Proxy(
  {
    foo: 'zzz',
    _zzz: '___',
  },
  {
    deleteProperty(target, key) {
      if (key.startsWith('_')) throw new Error('Error');
      return Reflect.deleteProperty(target, key);
    },
  },
);

console.log(proxy); // { foo: 'zzz', _zzz: '___' }
console.log(Reflect.deleteProperty(proxy, 'zzz')); // true
console.log(Reflect.deleteProperty(proxy, 'foo')); // true
// console.log(Reflect.deleteProperty(proxy, '_zzz')); // Error: Error
console.log(proxy); // { _zzz: '___' }

/* ------------------------------------------- */

// revoke - 可取消的 Proxy 实例
const proxy = Proxy.revocable({}, {});
proxy.proxy.foo = 123;
console.log(proxy.proxy.foo); // 123
console.log(proxy); // { proxy: { foo: 123 }, revoke: [Function (anonymous)] }
proxy.revoke();
console.log(proxy.proxy.foo); // TypeError: Cannot perform 'get' on a proxy that has been revoked

/* ------------------------------------------- */

// 通用 HTTP 请求拦截，拦截任何属性访问
const service = new Proxy(
  {},
  {
    get(target, key) {
      return () => HTTP.Get();
    },
  },
);

service.xxx().then();
