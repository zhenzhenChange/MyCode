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
  return function(){};
}

/* 如果没有 new 操作符，就是执行函数并拿到返回值 */
const p1 = new Person("zhenzhen");
const p2 = MyNew(Person, "Hello");
console.log(p1);
console.log(p2);
