/**
 * 字符串转换整数 (atoi)
 *
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
  const result = parseInt(str);

  if (result != result) return 0;
  if (result < -2147483648) return -2147483648;
  if (result > 2147483647) return 2147483647;

  return result;
};

var str = '+-2';
console.log(myAtoi(str));
