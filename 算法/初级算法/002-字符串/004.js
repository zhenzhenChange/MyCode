/**
 * 有效的字母异位词
 * 字母异位词：指字母相同，但排列不同的字符串。
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if ([...s].sort().join('') == [...t].sort().join('')) return true;
  return false;
};
var s = 'rat',
  t = 'car';

var result = isAnagram(s, t);
console.log(result);
