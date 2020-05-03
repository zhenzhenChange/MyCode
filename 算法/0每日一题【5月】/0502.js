/**
 * 0003.无重复字符的最长子串（滑动窗口算法）
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(∣Σ∣)
 * 
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let right = 0;

  let result = 0;

  const len = s.length;
  const set = new Set();

  while (left < len) {
    if (left != 0) set.delete(s.charAt(left - 1));

    while (right < len && !set.has(s.charAt(right))) set.add(s.charAt(right++));

    result = Math.max(result, right - left);

    left++;
  }

  return result;
};

var s = 'abcabcbb';
console.log(lengthOfLongestSubstring(s));
