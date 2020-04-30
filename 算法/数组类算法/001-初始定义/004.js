/**
 * 删除排序数组中的重复项 II
 *
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] == nums[i - 2]) nums.splice(i - 2, 1);
  }

  return nums.length;
};

var nums = [0, 0, 1, 1, 1, 1, 2, 3, 3];
console.log(removeDuplicates(nums));
