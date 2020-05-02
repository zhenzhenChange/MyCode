/**
 * 根据字符出现频率排序
 *
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  let index = 0;
  let count = 1;

  let result = '';

  const map = new Map();

  while (index < s.length) {
    const char = s.charAt(index);

    // 若已存在，则在原来的计数基础上 +1，否则是新的字符
    map.has(char) ? map.set(char, map.get(char) + 1) : map.set(char, count);

    index++;
  }

  // 按 key - value 的 value 也就是 count 个数，以降序排列
  const sortMap = [...map].sort((a, b) => b[1] - a[1]);

  // 重复字符，累加
  sortMap.map((item) => (result += item[0].repeat(item[1])));

  return result;
};

var s = 'tree';

console.log(frequencySort(s));
