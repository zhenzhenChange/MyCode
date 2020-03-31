function MyCreate(object) {
  if (object instanceof Object) {
    function Fn() {}
    Fn.prototype = object;
    return new Fn();
  }
  if (object === null) {
    const obj = new Object();
    obj.__proto__ = null;
    return obj;
  }
}

// const res1 = Object.create(null);
const res1 = MyCreate({ name: "1" });
const res2 = MyCreate(null);

console.log(res1);
console.log(res2);
