/**
 * 翻转字符串里的单词
 *
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  /* const strAry = s.split(' ').filter((item) => item != '');

  let left = 0;
  let right = strAry.length - 1;

  while (left < right) {
    [strAry[right], strAry[left]] = [strAry[left], strAry[right]];

    left++;
    right--;
  }

  return strAry.join(' '); */

  return s
    .split(' ')
    .filter((item) => item != '')
    .reverse()
    .join(' ');
};

var s = 'a good   example';
console.log(reverseWords(s));
