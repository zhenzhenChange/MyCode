/**
 * 缺失数字
 *
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  /* 
    nums.sort((a, b) => a - b);
    const len = nums.length;

    for (let i = 0; i < len; i++) {
      if (i != nums[i]) return i;
      if (i == len - 1) return i + 1;
    } 
  */

  let curr = 0;
  let len = nums.length;
  let result = len;

  for (let i = 0; i < len; i++) {
    curr += nums[i];
    result += i;
  }

  return result - curr;
};

var nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];
console.log(missingNumber(nums));
