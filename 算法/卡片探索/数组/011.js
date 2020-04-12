/**
 * 旋转图像
 *
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  /* => 使用标签语句重写双层 For 循环 */
  // 1.截取第一行，按顺序插入最后一列
  // 2.截取第二行，按顺序插入倒数第二列

  var len = matrix.length;

  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      [matrix[j][i], matrix[i][j]] = [matrix[i][j], matrix[j][i]];
    }
  }

  matrix.map((v) => v.reverse());
};

var matrix = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
];

var ary = [
  [15, 13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7, 10, 11],
];
rotate(matrix);
console.log(matrix);
