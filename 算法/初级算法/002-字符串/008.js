/**
 * 外观数列
 *
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  var wow = '1';
  for (let i = 1; i < n; i++) {
    wow = wow.replace(/(\d)\1*/g, (whole, part) => `${whole.length}${part}`);
  }
  return wow;
};

var n = 5;
var result = countAndSay(n);
console.log(result);
