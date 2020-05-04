/**
 * 0053.最大子序和（动态规划）
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let left = 0;
  let result = 0;

  let sum = nums[0];

  while (left < nums.length) {
    result = Math.max(result + nums[left], nums[left]);

    sum = Math.max(sum, result);

    left++;
  }

  return sum;
};

var nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

console.log(maxSubArray(nums));
