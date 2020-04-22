/**
 * 至少是其他数字两倍的最大数（耗时：99.59%，内存：97.13%）
 *
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
  const max = Math.max(...nums);
  const maxIndex = nums.indexOf(max);

  let flag = true;
  for (let i = 0; i < nums.length; i++) {
    if (i == maxIndex) continue;
    if (nums[i] * 2 > max) flag = false;
  }

  return flag ? maxIndex : -1;
};

var nums = [3, 6, 1, 0];
console.log(dominantIndex(nums));
