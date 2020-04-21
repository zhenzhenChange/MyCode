/**
 * 整数反转
 * 
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let y = 0;
  let MAX = Math.pow(2, 31) - 1;
  let MIN = -Math.pow(2, 31);
  while (x != 0) {
    y = y * 10 + (x % 10);
    if (y > MAX || y < MIN) {
      return 0;
    }
    x = Math.trunc(x / 10);
  }

  return y;
};

var x = -123;
var res = reverse(x);
console.log(res);
