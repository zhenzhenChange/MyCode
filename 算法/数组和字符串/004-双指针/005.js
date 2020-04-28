/**
 * 最大连续 1 的个数
 *
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  if (!nums.includes(1)) return 0;

  let max = 0;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 1) {
      max = Math.max(count, max);
      count = 0;
    } else {
      count++;
    }
  }

  return Math.max(count, max);
};

var nums = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1];
console.log(findMaxConsecutiveOnes(nums));
