/**
 * 两数之和
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  var map = new Map();
  var res;

  nums.forEach((v, i) => map.set(v, i));

  nums.forEach((v, i) => {
    var result = map.get(target - v);
    if (result && result !== i) {
      res = [i, result];
    }
  });

  return res;
};

var nums = [3, 3];
var target = 6;
var res = twoSum(nums, target);
console.log(res);
