var nums = [4, 1, 2, 1, 2];

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  nums.sort();

  return (nums.join("@") + "@").replace(/(-?\d+@)\1*/g, (whole) => {
    return whole.split("@").length - 1 === 1 ? parseFloat(whole) : "";
  });
};

const res = singleNumber(nums);
console.log(res);
