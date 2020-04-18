/**
 * 罗马数字转整数
 *
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const len = s.length;
  const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

  let result = roman[s.charAt(len - 1)];

  for (let i = len - 2; i >= 0; i--) {
    const curr = roman[s.charAt(i)];
    
    if (curr >= roman[s.charAt(i + 1)]) result += curr;
    else result -= curr;
  }

  return result;
};

var s = 'MCMXCIV';
console.log(romanToInt(s));
