/**
 * 实现 strStr()
 *
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  return haystack.indexOf(needle);
};

var haystack = 'aaaaa',
  needle = ' ';

var result = strStr(haystack, needle);
console.log(result);
