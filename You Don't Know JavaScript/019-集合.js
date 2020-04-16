/* TypedArray */
var buf = new ArrayBuffer(32);
console.log(buf);
console.log(buf.byteLength);

var arr = new Uint16Array(buf);
console.log(arr);
console.log(arr.length);

// 检测 JS 大小端（true 则为小端）
function littleEndian() {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
}

var ary = [10, 1, 2];
console.log(ary.sort()); // [1, 10, 2]

var bry = new Uint8Array([10, 1, 2]);
console.log(bry.sort()); // [1, 2, 10]

/* Map */

// 普通对象键值对 Object ，非字符串键都会转换为字符串（调用 toString 方法）
var obj = {};
var x = { id: 1 };
var y = { id: 2 };
obj[x] = 'x';
obj[y] = 'y';

console.log(obj); // { '[object Object]': 'y' }
console.log(obj.x); // undefined
console.log(obj.y); // undefined
console.log(obj[x]); // y
console.log(obj[y]); // y

// map 集合
var map = new Map();

// 设置值
map.set(x, 'x');
map.set(y, 'y');
console.log(map); // Map { { id: 1 } => 'x', { id: 2 } => 'y' }
console.log(map.set('xx', 'xx')); // 返回 Map | Map { { id: 1 } => 'x', { id: 2 } => 'y', 'xx' => 'xx' }

// 获取值
console.log(map.get(x)); // x
console.log(map.get(y)); // y

// 删除键
console.log(map.delete('xx')); // true

// 获取长度
console.log(map.size); // 2

// 清空集合
map.clear();
console.log(map.size); // 0

// 返回一个键值迭代器（数组）
console.log(map.entries()); // [Map Entries] { [ { id: 1 }, 'x' ], [ { id: 2 }, 'y' ] }

// 返回一个值迭代器
console.log(map.values()); // [Map Iterator] { 'x', 'y' }

// 返回一个键迭代器
console.log(map.keys()); // [Map Iterator] { { id: 1 }, { id: 2 } }

console.log([...map.keys()][0]); // object

// 检测是否含有键
console.log(map.has('xx')); // false

// 接受一个 iterable
var map2 = new Map(map);
var map3 = new Map(map.entries());
console.log(map2); // Map { { id: 1 } => 'x', { id: 2 } => 'y' }
console.log(map3); // Map { { id: 1 } => 'x', { id: 2 } => 'y' }

// 手动指定一个含有 [键, 值] 数组的数组
var map4 = new Map([
  ['item1', '1'],
  ['item2', '2'],
  ['NaN', 'NaN'],
  [NaN, NaN],
  [NaN, NaN], // 在 map 集合中会去重，NaN 和 -0 被视为相等，且不会强制转换类型
  [+0, 0],
  [-0, 0],
]);

// 迭代默认使用 entries 迭代器
for (const val of map4()) {
  console.log(val);
}

console.log(map4); // Map { 'item1' => '1', 'item2' => '2' }

console.log([...map4.keys()]); // [ 'item1', 'item2' ]
console.log([...map4.values()]); // [ '1', '2' ]
console.log([...map4.entries()]); // [ [ 'item1', '1' ], [ 'item2', '2' ] ]

// 弱引用 Map ：对对象的引用是弱持有的，如果对象本身被 GC ，则会在 WeakMap 中移除这个键值对
var wm = new WeakMap();
var x = { id: 1 };
var y = { id: 2 };
var z = { id: 3 };
var w = { id: 4 };

// 由于 x 已经被 GC 所以 y 也可以被 GC
wm.set(x, y);
x = null;
y = null;

// 由于 z 没有被 GC 所以 w 不会被 GC
wm.set(z, w);
w = null;

console.log(wm);

// Set 集合：值的集合
var set = new Set();
var x = { id: 1 };
var y = { id: 2 };

set.add(x);
set.add(y);

console.log(set); // Set { { id: 1 }, { id: 2 } }
console.log(set.has(x)); // true
console.log(set.delete(y)); // true
console.log(set.delete('y')); // false | 找不到该值会返回 false
console.log(set.has(y)); // false
console.log(set.size); // 1
console.log(set.entries()); // [Set Entries] { [ { id: 1 }, { id: 1 } ] } | 键值都是值，为与 Map 对称
console.log(set.keys()); // [Set Iterator] { { id: 1 } }
console.log(set.values()); // [Set Iterator] { { id: 1 } } | 迭代默认使用 values 迭代器
console.log(set.keys() === set.values()); // false
set.clear();

// 接受一个 iterable，或者手动指定一个 [值] 数组
var set2 = new Set(set);
var set3 = new Set(['a', 'b']);
console.log(set2); // Set { { id: 1 } }
console.log(set3); // Set { 'a', 'b' }

// 弱引用 Set
var vs = new WeakSet();
var x = { id: 1 };
vs.add(x);
x = null;
// vs.add('s'); // Invalid value used in weak set | 必须是一个对象

/*
 * 集合的 has 算法，与 Object.is() 的几乎一样
 */
