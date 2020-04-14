/* ES6 新语法：函数参数默认值 */
function foo(x = 11, y = 22) {
  /* 等价于 ↓ */
  /*
    x = x !== undefined ? x : 11;
    y = y !== undefined ? y : 22;
  */

  console.log(x + y);
}

foo(); // 33
foo(1); // 23
foo(1, 1); // 2

foo(1, null); // 1：null 强制转换成 0
foo(1, undefined); // 23：undefined 被丢弃

foo(null, 1); // 1：null 强制转换成 0
foo(undefined, 1); // 12：undefined 被丢弃

console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN

console.log(Function.prototype.toString()); // function () { [native code] }
console.log(Array.prototype.toString()); // ""
console.log(Object.prototype.toString()); // [object Object]
console.log(RegExp.prototype.toString()); // /(?:)/

function bar() {
  return {
    x: 1,
    y: 2,
    z: 3,
  };
}
let p;
p = { x, z } = bar();
console.log(x, p, z);

function bazZ({ x = 10 } = {}, { y } = { y: 10 }) {
  console.log(x, y);
}
bazZ(); // 10 10
bazZ(undefined, undefined); // 10 10
bazZ({}, undefined); // 10 10
bazZ(undefined, {}); // 10 undefined
bazZ({}, {}); // 10 undefined
bazZ(2, 3); // 10 undefined
bazZ({ x: 2 }, { y: 3 }); // 2 3
bazZ(null, null); // TypeError: Cannot destructure property `x` of 'undefined' or 'null'.

const obj = {
  __id: 10,
  get id() {
    return this.__id++;
  },
  // Setter函数参数不能是rest参数
  set id(/* ...val */ val) {
    this.__id = val;
  },
};

console.log(obj.id);
console.log(obj.id);
obj.id = 1000;
obj.__id = 1000;
console.log(obj.__id);
console.log(obj.__id);
console.log(obj.__id);

var obj2 = {
  name: 'zhenzhen',
};

var obj3 = {
  ['__proto__']: obj2,
};

console.log(obj3);
