/**
 * 快乐数
 *
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  // 能否直接递归？
  const set = new Set();

  while (n != 1) {
    // 查表
    if (set.has(n)) return false;

    set.add(n);

    n = [...String(n)].reduce((prev, next) => prev + next ** 2, 0);
  }

  return true;
};

var n = 116;
console.log(isHappy(n));
