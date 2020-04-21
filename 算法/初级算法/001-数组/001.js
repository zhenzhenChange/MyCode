/**
 * 删除排序数组中的重复项
 *
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  /* 1：双重循环
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] === nums[j]) {
          nums.splice(i, 1);
          j--;
        }
      }
    }

    return nums.length; 
  */

  /* 2.正则 */
  const strArr = nums.join('@') + '@';

  nums.length = 0;

  strArr.replace(/(-?\d+@)\1*/g, (whole, part) => {
    nums.push(parseFloat(part));
  });

  return nums;
};
const arr1 = [1, 1, 2];
const arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

console.log(removeDuplicates(arr2));
arr1.splice();
