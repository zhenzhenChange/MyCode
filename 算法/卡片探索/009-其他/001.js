/**
 * 位1的个数
 * 
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  const ary = n.toString(2).match(/1/g);
  return ary ? ary.length : 0;
};

var n = 0;
console.log(hammingWeight(n));
