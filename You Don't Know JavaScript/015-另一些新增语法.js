var ary = ['a', 'b', 'c', 'd'];
console.log(Object.keys(ary));

// for of
for (let ret, it = ary[Symbol.iterator](); (ret = it.next()) && !ret.done; ) {
  console.log(ret.value);
}

for (const val of ary) {
  console.log(val);
}

// 遍历操作
var str = 'Hello';
for (const val of str) {
  console.log(val);
}

// 赋值操作
var obj = {};
for (obj.a of ary) {
  console.log(obj);
}
console.log(obj);

for ({ x: obj.a } of [{ x: 1 }, { x: 2 }, { x: 3 }]) {
  console.log(obj);
}
console.log(obj);

var reg = /foo/gim;
console.log(reg); // /foo/gim
console.log(reg.source); // foo
console.log(reg.flags); // gim

var 𫐀 = 42;
console.log('\u2603');
console.log('\u{1D11E}');
console.log(𫐀);

var sym = Symbol('zhenzhen');
console.log(sym); // Symbol(zhenzhen)
console.log(typeof sym); // symbol
console.log(sym.toString()); // Symbol(zhenzhen)
console.log(sym instanceof Symbol); // false 因为 Symbol 不是一个构造器，不能创建一个对象

var symObj = Object(sym);
console.log(symObj); // [Symbol: Symbol(zhenzhen)]
console.log(symObj instanceof Symbol); // true
console.log(symObj.valueOf() === sym); // true

console.log(Symbol.for('zhenzhen')); // Symbol(zhenzhen)
console.log(Symbol.keyFor(Symbol.for('zhenzhen'))); // zhenzhen
