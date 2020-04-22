/**
 * 对角线遍历
 *
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function (matrix) {
  let indexLen = 0;
  const result = [];
  const aryLen = matrix.length;

  if (!aryLen) return result;

  const len = 2 * aryLen - 1;

  // 一条对角线一轮，每轮拿到一条对角线的所有值
  for (let i = 0; i < len; i++) {
    const ary = [];
    let temp = indexLen;

    for (let j = 0; j < aryLen; j++) {
      var curr = matrix[j][temp--];

      // 过滤 undefined
      curr && ary.push(curr);
    }

    // 奇数对角线反序（对应的索引就是偶数）
    if (i % 2 == 0) {
      result.push(...ary.reverse());
    } else {
      result.push(...ary);
    }

    indexLen++;
  }

  return result;
};

var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(findDiagonalOrder(matrix));
