/**
 * 计数质数
 *
 * 埃拉托斯特尼筛法
 *
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  let count = 0;
  const ary = new Uint8Array(n);

  for (let i = 2; i < n; i++) {
    if (!ary[i - 1]) {
      count++;
      for (let j = i * i; j <= n; j += i) {
        ary[j - 1] = true;
      }
    }
  }

  return count;
};

var n = 10;
var result = countPrimes(n);
console.log(result);
