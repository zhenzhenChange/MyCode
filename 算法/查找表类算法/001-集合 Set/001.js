/**
 * 两个数组的交集
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const A = new Set(nums1);
  const B = new Set(nums2);

  // 查表
  return [...A].filter((num) => B.has(num));
};

var nums1 = [1, 2, 2, 1];
var nums2 = [2, 2];
console.log(intersection(nums1, nums2));
