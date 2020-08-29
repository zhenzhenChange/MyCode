// 代表存储二进制数据的一段内存，不能直接读/写，参数为所需要的内存大小（单位为字节），每个字节的默认值为0
const buffer = new ArrayBuffer(32);
console.log(buffer);

// 为了读/写这段内存，需要为它指定视图，参数为 ArrayBuffer 实例
const dataView = new DataView(buffer);
console.log(dataView);

// 以不带符号的8位整数格式读取第一个元素
console.log(dataView.getUint8(0)); // 0

// TypeArray 视图是一类构造函数
const ary1 = new Int32Array(buffer);
const ary2 = new Uint32Array(buffer);

// 2个视图操作同一块内存，一个视图修改底层内存会影响另一个视图
ary1[0] = 1;
console.log(ary1[0]); // 1
console.log(ary2[0]); // 1

ary2[0] = 2;
console.log(ary1[0]); // 2

// 可接受普通数组（类数组、Map、Set）（有 length 属性的对象）作为参数，直接分配内存生成底层 ArrayBuffer 实例，同时完成内存赋值
const typedArray = new Uint8Array([0, 1, 2]);
// const typedArray = new Uint8Array({ length: 3, 0: 4, 1: 5, 2: 5 });

console.log(typedArray); // Uint8Array(3) [ 0, 1, 2 ]
typedArray[0] = 5;
console.log(typedArray); // Uint8Array(3) [ 5, 1, 2 ]

// 其本身不存储数据，数据存储在底层的 buffer 对象中
console.log(typedArray.buffer);


// 返回所分配的内存区域的字节长度（如果要分配的内存区域很大，有可能分配失败，因为没有足够的连续的内存空间）
console.log(buffer.byteLength); // 32

// 实例方法 slice 将内存区域的一部分或者全部复制生成一个新的 ArrayBuffer 实例对象
// 第一步先分配新内存，第二步进行复制
const copy1 = buffer.slice();
const copy2 = buffer.slice(0);
const copy3 = buffer.slice(0, 3);
console.log(copy1);
console.log(copy2);
console.log(copy3);

// 判断参数是否为视图实例
console.log(ArrayBuffer.isView(buffer)); // false
console.log(ArrayBuffer.isView(dataView)); // true
console.log(ArrayBuffer.isView(typedArray)); // true