/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let step = nums.length - 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= step) step = i;
  }

  return step == 0;
};
var nums = [3, 2, 1, 0, 4];
console.log(canJump(nums));
