/**
 * 字符串中的第一个唯一字符
 * 
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  /* var len = s.length;
  var map = new Map();

  for (let i = 0; i < len; i++) {
    var char = s.charAt(i);
    map.set(char, i);
  }

  if (s == '' || map.size == len / 2) return -1;
  
  return [...map.values()].sort((a, b) => a - b).shift(); */

  for (let i = 0, len = s.length; i < len; i++) {
    var char = s.charAt(i);
    if (s.indexOf(char) === s.lastIndexOf(char)) return i;
  }
  return -1;
};

var s = 'aadadaaddccde';

var res = firstUniqChar(s);
console.log(res);
