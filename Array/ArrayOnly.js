/* 数组去重 */
let arr = [12, 23, 12, 15, 25, 23, 25, 14, 16];
let len = arr.length;

/* --------------------------------------------- */

/* Set 利用Set集合的特性 */
let newArr = [...new Set(arr)];
let newBrr = Array.from(new Set(arr));

/* --------------------------------------------- */

/* For 双重for循环 */
for (let i = 0; i < len; i++) {
  for (let j = i + 1; j < len; j++) {
    if (arr[i] === arr[j]) {
      arr.splice(i, 1); // 需减一，否则造成数组塌陷
      j--;
    }
  }
}

/* --------------------------------------------- */

/* Object 利用对象中属性的唯一性 */
let objArr = {};
const newDrr = [];

for (let i = 0; i < len; i++) {
  const item = arr[i];
  objArr[item] = item;
}

for (const key in objArr) {
  newDrr.push(objArr[key]);
}

objArr = null;

/* --------------------------------------------- */

/* RegExp 正则匹配方式 相邻项 */
const newErr = [];

// 升序排序
arr.sort((a, b) => a - b);

// 拆分数组并且每项后面拼接一个字符串
const strArr = arr.join("@") + "@";

// 正则：以数字开头+@符结尾，捕获0 - N 次
const reg = /(\d+@)\1*/g;

// 替换
strArr.replace(reg, (whole, part) => {
  newErr.push(parseFloat(part));
});

/* --------------------------------------------- */
