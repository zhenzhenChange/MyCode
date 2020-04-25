/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let count = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] != val) count++;
  }

  return count;
};

var nums = [3, 2, 2, 3];
var val = 3;

console.log(removeElement(nums, val));
