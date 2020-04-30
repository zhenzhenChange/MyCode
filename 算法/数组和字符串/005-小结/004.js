/**
 * 反转字符串中的单词 III
 *
 * @param {string} s
 * @return {string}
 */
var reverseWords = (s) => s.split('').reverse().join('').split(' ').reverse().join(' ');

var s = "Let's take LeetCode contest";
console.log(reverseWords(s));
