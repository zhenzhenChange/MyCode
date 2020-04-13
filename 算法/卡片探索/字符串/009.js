/**
 * 最长公共前缀
 *
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs.length) return '';

  const [start, ...args] = strs;
  let str = '';

  for (let i = 0; i < start.length; i++) {
    const flag = args.every((v) => v.indexOf(start[i]) != -1);
    if (flag) str += start[i];
    else break;
  }

  return str;
};

var strs = ['flower', 'flow', 'flight'];
var result = longestCommonPrefix(strs);
console.log(result);
