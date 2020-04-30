/**
 * 颜色分类
 *
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  /* 
    let red = 0;
    let write = 0;
    let blue = 0;
    for (let i = 0; i < nums.length; i++) {
      switch (nums[i]) {
        case 0:
          red++;
          break;
        case 1:
          write++;
          break;
        case 2:
          blue++;
          break;
      }
    }

    const count = red + write + blue;
    
    for (let i = 0; i < count; i++) {
      if (i < red) {
        nums[i] = 0;
      }

      if (i >= red && i < red + write) {
        nums[i] = 1;
      }

      if (i >= red + write && i < count) {
        nums[i] = 2;
      }
    }

    return nums;
  */

  // 三路快速排序
  let i = 0;
  let left = -1;
  let right = nums.length;

  while (i < right) {
    switch (nums[i]) {
      case 0:
        left++;
        [nums[left], nums[i]] = [nums[i], nums[left]];
        i++;
        break;
      case 1:
        i++;
        break;
      case 2:
        right--;
        [nums[right], nums[i]] = [nums[i], nums[right]];
        break;
    }
  }

  return nums;
};

var nums = [2, 0, 2, 1, 1, 0];
console.log(sortColors(nums));
