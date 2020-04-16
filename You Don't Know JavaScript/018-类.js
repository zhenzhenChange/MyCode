/* ES6 之前 */
function Foo(x, y) {
  this.x = x;
  this.y = y;
}

Foo.prototype.gimmeXY = function () {
  return this.x * this.y;
};

/* ES6 class 语法糖 */
class Foo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    console.log('Foo:', new.target);
  }

  gimmeXY() {
    return this.x * this.y;
  }
}

var foo = new Foo(5, 10);
console.log(foo.x);
console.log(foo.y);
console.log(foo.gimmeXY());
console.log(Foo);

// extends：在两个函数原型之间建立委托链接
// super：指向父构造器
class Bar extends Foo {
  constructor(x, y, z) {
    super(x, y);
    this.z = z;
    console.log('Bar:', new.target);
    // super(x, y); 在访问'this'或从派生构造函数返回之前，必须在派生类中调用 super
  }

  gimmeXYZ() {
    return super.gimmeXY() * this.z;
  }

  static MyHome() {
    console.log('zhenzhen');
  }
}

var bar = new Bar(5, 15, 25);
console.log(bar.x);
console.log(bar.y);
console.log(bar.z);
console.log(bar.gimmeXYZ());

Bar.MyHome(); // zhenzhen
bar.MyHome(); // undefined

/* Symbol.species Getter */
class MyArray extends Array {
  // 强制 species 为父构造器
  static get [Symbol.species]() {
    return Array;
  }
}

var my = new MyArray(1, 2, 3);
var b = my.map((v) => v * 2);

console.log(my instanceof MyArray); // true
console.log(b instanceof MyArray); // false
console.log(my instanceof Array); // true
console.log(b instanceof Array); // true
