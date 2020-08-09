// 字符串扩展

// 使用 Unicode 码点 表示一个字符 - 界限：\u0000 ~ \uFFFF 之间
console.log('\u0061'); // a

// 超出界限需使用 2 个双字节的形式
console.log('\uD842\uDFB7'); // 𠮷

console.log('\u20BB'); // ₻
console.log('\u20BB7'); // ₻7

// 使用 {} 包围能正确解析
console.log('\u{20BB7}'); // 𠮷

// 使用 {} 表示法 与 2 个双字节表示法是等价的
console.log('\u{1F680}' === '\uD83D\uDE80'); // true

/* --------------------------------------------------- */

// 用于处理 4 个字节的字符 - 返回的码点为十进制
const str = '𠮷A';
console.log(str.codePointAt(0)); // 134071
console.log(str.codePointAt(1)); // 57271

// A 的位置应该是 2 ，但因 𠮷 是 4 个字节，双字符
console.log(str.codePointAt(2)); // 65
console.log(str.codePointAt(2)?.toString(16)); // 41

// 可用 for of 循环正确识别 32 位的 UTF-16 字符
for (const char of str) {
  console.log(char.codePointAt(0).toString()); // 134071 65
}

// 测试一个字符是否由 2 字节组成还是 4 字节组成
function is32Bit(char) {
  return char.codePointAt(0) > 0xffff;
}

console.log(is32Bit('𠮷')); // true
console.log(is32Bit('A')); // false

/* --------------------------------------------------- */

// 从码点返回对应字符（识别大于 0xFFFF 的字符），作用与 codePointAt 相反
console.log(String.fromCodePoint(65)); // A

// 若未传参或者传空数组，则返回空串
console.log(String.fromCodePoint([])); // ""
console.log(String.fromCodePoint()); // ""

// 多个参数会被合并
console.log(String.fromCodePoint(65, 65, 65)); // AAA

/* --------------------------------------------------- */

// 字符串自带 iterator 接口 - 且可以识别大于 0xFFFF 的码点
for (const char of 'zhenzhen') {
  console.log(char); // z h e n z h e n
}

// 传统 for 循环不能识别，打印会是乱码，且会认为是 2 个字符
const str = String.fromCodePoint(0x20bb7);
for (let i = 0; i < str.length; i++) {
  console.log(str[i]); // � �
}

for (const char of str) {
  console.log(char); // 𠮷
}

// 返回字符串成指定位置的字符
const str = '𠮷ABC';
console.log(str.charAt(0)); // �
console.log(str.charAt(1)); // �
console.log(str.charAt(2)); // A

// 指定的索引处没有字符则返回空串
console.log(str.charAt(2222)); // ""

// 转换成码点
console.log(str.charCodeAt(0)); // 55362
console.log(str.charCodeAt(1)); // 57271
console.log(str.charCodeAt(2)); // 65

// 指定的索引处没有字符则返回 NaN
console.log(str.charCodeAt(222)); // NaN

/* --------------------------------------------------- */

// 字符串查询/搜索操作
const str = 'zhenzhen Love Ou Change [object Object]';

// 返回布尔值，判定是否找到参数字符串
console.log(str.includes('love')); // false
console.log(str.includes('Love')); // true

// 若传入的不是字符串，将尝试转换成字符串
console.log(str.includes({})); // true

// 返回布尔值，判定参数字符串是否在源字符串开头
console.log(str.startsWith('O')); // false
console.log(str.startsWith('zhenzhen')); // true

// 返回布尔值，判定参数字符串是否在源字符串结尾
console.log(str.endsWith('zhenzhen')); // false
console.log(str.endsWith('Object]')); // true

// 支持第二个参数，从第几位开始查询
console.log(str.includes('zhen', 5)); // false
console.log(str.startsWith('zhen', 4)); // true

// endsWith 与上述两个不同，它针对前 n 个字符
console.log(str.endsWith('zhen', 5)); // false
console.log(str.endsWith('zhen', 8)); // true

/* --------------------------------------------------- */

// 字符串重复/复制操作，返回新字符串，若参数为 0 或能转换成 0，则返回空串（先将参数转换成 number 类型）
const str = 'zhen';
console.log(str.repeat('4a')); // "" -> 转换成数字为 NaN 等同于 0
console.log(str.repeat('4')); // zhenzhenzhenzhen
console.log(str.repeat(5)); // zhenzhenzhenzhenzhen
console.log(str.repeat(0)); // ""
console.log(str.repeat()); // ""

// 小数会向下取整
console.log(str.repeat(2.4));
console.log(str.repeat(2.5));
console.log(str.repeat(2.6));

// 小于 -1 的负数将报错哦
// console.log(str.repeat(-1)); // RangeError: Invalid count value

// 0 ~ -1 会被取整为 -0 === 0
console.log(str.repeat(-0.1)); // ""

/* --------------------------------------------------- */

// 字符串补齐操作 - 补齐后的最小长度为第一个参数，补上的字符串为第二个参数
const str = 'zhenzhen';

// 在头部补齐
console.log(str.padStart(10, 'A')); // AAzhenzhen

// 在尾部补齐
console.log(str.padEnd(10, 'BB')); // zhenzhenBB

// 若指定的长度小于等于源字符串长度，则返回源字符串
console.log(str.padStart(8, 'A')); // zhenzhen
console.log(str.padStart(7, 'A')); // zhenzhen

// 若指定补齐字符串与源字符串的长度之和超过指定长度，则指定补齐字符串将被从左往右截取足量的字符串
console.log(str.padStart(10, 'CCCCCCCCCC')); // CCzhenzhen

// 省略第二个参数将用空格补齐
console.log(str.padStart(10)); //   zhenzhen

// 会将第一个参数转换成 number 再操作
console.log(str.padStart('10')); //   zhenzhen

// 转换失败，返回源字符串
console.log(str.padStart('10a')); // zhenzhen

// 常用于日期/货币补齐操作
console.log('12'.padStart(10, 'YYYY-MM-DD')); // YYYY-MM-12

// TODO
// 1.模板字符串