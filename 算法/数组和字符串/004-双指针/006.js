/**
 * 长度最小的子数组（滑动窗口算法）
 *
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
  let sum = 0;
  let left = 0;
  let right = 0;
  const len = nums.length;
  let result = len + 1;

  while (left < len) {
    right < len && sum < s ? (sum += nums[right++]) : (sum -= nums[left++]);

    if (sum >= s) result = Math.min(result, right - left);
  }

  if (result == len + 1) return 0;

  return result;
};

var s = 8;
var nums = [2, 3, 1, 2, 4, 3];

console.log(minSubArrayLen(s, nums));
