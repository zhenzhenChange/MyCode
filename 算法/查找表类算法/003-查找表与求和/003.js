/**
 * 四数之和
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const result = [];
  const len = nums.length;

  if (len < 4) return result;

  nums.sort((a, b) => a - b);

  for (let i = 0; i <= len - 4; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue;

    for (let j = i + 1; j <= len - 3; j++) {
      if (j > i + 1 && nums[j] == nums[j - 1]) continue;

      let left = j + 1;
      let right = len - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum == target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          while (left < right && nums[left] == nums[left + 1]) left++;
          while (left < right && nums[right] == nums[right - 1]) right--;

          left++;
          right--;
        } else if (sum > target) {
          right--;
        } else {
          left++;
        }
      }
    }
  }

  return result;
};

var target = 0;
var nums = [1, 0, -1, 0, -2, 2];

console.log(fourSum(nums, target));
