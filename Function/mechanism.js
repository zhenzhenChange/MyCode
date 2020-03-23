/*
 * 栈内存（Stack | ECStack）
 * 1.EC：Execution Context 执行环境
 * 2.VO：Variable Object   变量对象
 * 3.AO：Activation Object 活动对象
 *
 * 堆内存（Heap）
 */

/*
 * typeof null 为啥是 "object"
 * 1.值在计算机存储中是以二进制表示，以32位为单位存储
 * 2.32位包括1~3位的标记表示数据类型，剩余的表示实际的数据值
 * 3.共有5种标记
 *    000：object  表示数据是对对象的引用
 *    1  ：int     表示数据是一个31位有符号整数
 *    010：double  表示数据是一个浮点数
 *    100：string  表示数据是一个字符串
 *    110：boolean 表示数据是一个布尔值
 * 4.在JavaScript中，null的存储二进制是000，所以typeof判断时返回的是object
 */

console.log(typeof null);

// + 运算符，若是数字先运算，则尝试将其它值转换成数字。遇到字符串则进行拼接操作。后续的都会转换成字符串
// 1 + 0 + 1 + NaN + "zhenzhen" + "false" + "" + "undefined" + "null"
const result = 1 + null + true + undefined + "zhenzhen" + false + [] + undefined + null;
console.log([] == false);
console.log(![] == false);
console.log(![] == []);

function MyEach(callback) {
  if (Array.isArray(this)) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  }
}

Array.prototype.MyEach = MyEach;

const arr = [2, 3, 455, 6233];
arr.MyEach((item, index, currentArr) => {
  console.log(item, index, currentArr);
});

arr.forEach((item, index, a) => {
  console.log(item, index, a);
});
