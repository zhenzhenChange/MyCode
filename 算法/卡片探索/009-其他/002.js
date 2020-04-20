/**
 * 汉明距离
 *
 * 布赖恩·克尼根算法
 *
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let count = 0;
  let result = x ^ y;

  while (result) {
    result = result & (result - 1);
    count++;
  }

  return count;
};

var x = 1;
var y = 4;
console.log(hammingDistance(x, y));
