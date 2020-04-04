/* => 类模式单例 */
function Singleton(name) {
  this.name = name;
}

Singleton.instance = null;

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.createInstance = function (name) {
  return this.instance || (this.instance = new Singleton(name));
};

var instance = Singleton.createInstance('zhenzhen');
var instance2 = Singleton.createInstance('zhenzhen2');

console.log(instance);
console.log(instance2);
console.log(instance === instance2); // => true

/* --------------------------------------------------------- */

/* => JS -> 惰性单例 */
const Single = {
  instance: null,
  singleInstance: null,
  createSingle: function (fn) {
    return (...args) => this.instance || (this.instance = fn.apply(this, args));
  },
};

Single.singleInstance = Single.createSingle(function () {
  return 'My name is zhenzhen';
});

const res = Single.singleInstance('zhenzhen');
console.log(res);

/* 立即执行版防抖函数【思想】即为惰性单例模式 */
const debounce = (fn, delay) => {
  let flag;
  return (...args) => {
    if (flag) return;
    flag = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
