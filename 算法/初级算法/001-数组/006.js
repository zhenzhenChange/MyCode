/**
 * 两个数组的交集 II
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  var arr = [];
  nums1.forEach((v) => {
    var index = nums2.indexOf(v);
    if (index !== -1) {
      nums2.splice(index, 1);
      arr.push(v);
    }
  });
  return arr;
};

var nums1 = [3, 1, 2],
  nums2 = [1, 1];
var res = intersect(nums1, nums2);
console.log(res);
