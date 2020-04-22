/**
 * 寻找数组的中心索引
 *
 * 左 + 中 + 右 = 总和
 * 当左和右相等时：2*左（右） + 中 = 总和
 *
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  let sum = 0;
  let leftSum = 0;

  nums.forEach((v) => (sum += v));

  return nums.findIndex((v) => {
    if (sum - 2 * leftSum == v) return true;
    leftSum += v;
  });
};

var nums = [1, 7, 3, 6, 5, 6];
console.log(pivotIndex(nums));
