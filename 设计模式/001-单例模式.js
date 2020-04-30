/*
 * 单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 * 1.设置一个标志，表示当前是否已经创建过对象；
 * 2.根据标志，如果已经创建过，直接返回之前创建的对象。
 */

/* => 面向对象版 */
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

var instance1 = Singleton.createInstance('zhenzhen1');
var instance2 = Singleton.createInstance('zhenzhen2');

console.log(instance1);
console.log(instance2);
console.log(instance1 === instance2); // => true

/* --------------------------------------------------------- */

/* => 关联委托版 */
const Single = {
  instance: null,
  singleInstance: null,
  createSingle: function (fn) {
    return (...args) => this.instance || (this.instance = fn.apply(this, args));
  },
};

Single.singleInstance = Single.createSingle(() => 'My name is zhenzhen');

console.log(Single.singleInstance('zhenzhen'));
