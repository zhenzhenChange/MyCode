/**
 * 存在重复元素
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = (nums) => nums.length > new Set(nums).size;

var arr = [1, 2, 3, 4];
var res = containsDuplicate(arr);
console.log(res);
