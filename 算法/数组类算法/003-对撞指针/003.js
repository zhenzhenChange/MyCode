/**
 * 反转字符串中的元音字母
 *
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  s = [...s];
  let left = 0;
  let right = s.length;
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

  while (left < right) {
    if (!vowels.has(s[left])) {
      left++;
      continue;
    }

    if (!vowels.has(s[right])) {
      right--;
      continue;
    }

    if (s[left] != s[right]) [s[right], s[left]] = [s[left], s[right]];

    left++;
    right--;
  }

  return s.join('');
};

var s = 'leetcode';
console.log(reverseVowels(s));
