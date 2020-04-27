/**
 * 两数之和 II - 输入有序数组
 *
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  /* 1.双层循环
    const len = numbers.length;
    for (let i = 0; i < len; i++) {
      for (let j = len - 1; j >= 0; j--) {
        const result = numbers[i] + numbers[j];
        if (result == target && i != j) {
          return [i + 1, j + 1];
        }
      }
    }
  */

  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const result = numbers[left] + numbers[right];

    if (result == target) return [left + 1, right + 1];

    if (result > target) right--;
    else left++;
  }
};

var numbers = [2, 7, 11, 15];
var target = 9;
console.log(twoSum(numbers, target));
