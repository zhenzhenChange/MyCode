/**
 * 只出现一次的数字
 *
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  // 1.
  // nums.sort();

  // return (nums.join('@') + '@').replace(/(-?\d+@)\1*/g, (whole) => {
  //   return whole.split('@').length - 1 === 1 ? parseFloat(whole) : '';
  // });

  // 3.
  for (let i = 0, len = nums.length; i < len; i++) {
    var cur = nums[i];
    if (nums.indexOf(cur) === nums.lastIndexOf(cur)) return cur;
  }
};

var nums = [4, 1, 2, 1, 2];
const res = singleNumber(nums);
console.log(res);
