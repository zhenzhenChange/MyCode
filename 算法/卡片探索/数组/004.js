var arr = [1, 2, 3, 4];

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = nums => nums.length > new Set(nums).size;
var res = containsDuplicate(arr);
console.log(res);
console.log(new Set(arr).size);
