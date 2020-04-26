/**
 * 数组拆分 I
 *
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
  let result = 0;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i += 2) result += nums[i];

  return result;
};

var nums = [1, 4, 3, 2];
console.log(arrayPairSum(nums));
