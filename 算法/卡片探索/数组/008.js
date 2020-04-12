/**
 * 移动零
 *
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === 0) nums.push(nums.splice(i, 1)[0]);
  }
};

var nums = [0, 0, 1];
moveZeroes(nums);
console.log(nums);
