/**
 * 0045.跳跃游戏 II（贪心算法）
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let i = 0;
  let end = 0;
  let steps = 0;
  let maxPosition = 0;

  while (i < nums.length - 1) {
    maxPosition = Math.max(maxPosition, i + nums[i]);

    if (i == end) {
      end = maxPosition;
      steps++;
    }

    i++;
  }

  return steps;
};

var nums = [2, 3, 1, 1, 4];
console.log(jump(nums));
