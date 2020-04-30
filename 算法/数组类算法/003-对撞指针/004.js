/**
 * 盛最多水的容器
 *
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let sum = 0;

  while (left < right) {
    sum = Math.max(sum, (right - left) * Math.min(height[left], height[right]));

    height[left] > height[right] ? right-- : left++;
  }

  return sum;
};

var height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(height));
