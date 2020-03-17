/* 数组扁平化（平铺） */
let arr = [[1, 2, 2], [2, 33, 4, 5, 4], [2, 34, 5, [11, 22, [22, 33, [42]]]], 12];

/* --------------------------------------------- */

/* Flat */
const newArr = arr.flat(Infinity);

/* --------------------------------------------- */

/* 转换为字符串 */
const newBrr = arr
  .toString()
  .split(",")
  .map(item => Number(item));

const newCrr = JSON.stringify(arr)
  .replace(/(\[|\])/g, "")
  .split(",")
  .map(item => Number(item));

/* --------------------------------------------- */

/* 循环判断是否为数组 */
while (arr.some(item => Array.isArray(item))) {
  arr = [].concat(...arr);
}

/* --------------------------------------------- */

function myFlat() {
  const newArr = [];
  const fn = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        fn(arr[i]);
        continue;
      }
      newArr.push(arr[i]);
    }
  };
  fn(this);
  return newArr;
}
Array.prototype.myFlat = myFlat;

/* --------------------------------------------- */
