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
  // 执行用时：80 ms，在所有 JavaScript 提交中击败了 35.33% 的用户
  // 内存消耗：35.1 MB，在所有 JavaScript 提交中击败了 100.00% 的用户

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
