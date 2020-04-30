/**
 * 数组中的第K个最大元素
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = (nums, k) => nums.sort((a, b) => a - b)[nums.length - k];

var nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
var k = 5;
console.log(findKthLargest(nums, k));
