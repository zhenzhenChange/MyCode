/**
 * 3 的幂
 *
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
  // 使用立方根函数递归
  // console.log(Math.cbrt(n));

  while (n >= 3) n /= 3;
  return n == 1;
};

var n = 0;
console.log(isPowerOfThree(n));
