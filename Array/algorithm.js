/* 斐波那契数列 */
function series(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return series(n - 2) + series(n - 1);
  }
}

/* 输入一个整数N，输出所有和为N的连续正数序列 */
/* 
  输入：15
  输出：[[1,2,3,4,5],[4,5,6],[7,8]]
*/

function fn(number) {
  let result = [];
  let midValue = Math.ceil(number / 2);
  for (let i = 1; i < midValue; i++) {
    for (let j = 2; ; j++) {
      let count = (i + (i + j - 1)) * (j / 2);
      if (count > number) {
        break;
      } else if (count === number) {
        result.push(createArr(i, j));
        break;
      }
    }
  }
  return result;
}

function createArr(n, len) {
  let arr = new Array(len).fill(null);
  let temp = [];
  arr[0] = n;
  arr = arr.map((item, index) => {
    if (item === null) {
      item = temp[index - 1] + 1;
    }
    temp.push(item);
    return item;
  });
  return arr;
}

console.log(fn(4));
console.log(fn(5));
console.log(fn(8));
console.log(fn(15));
