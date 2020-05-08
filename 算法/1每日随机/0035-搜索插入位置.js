/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == target) return i;
  }

  nums.push(target);
  return nums.sort((a, b) => a - b).indexOf(target);
};

var target = 0;
var nums = [1, 3, 5, 6];
console.log(searchInsert(nums, target));
