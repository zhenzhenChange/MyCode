/**
 * 0221.最大正方形（动态规划）
 *
 * 时间复杂度：O(mn)
 * 空间复杂度：O(mn)
 *
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  let result = 0;
  const rows = matrix.length;
  const dp = new Array(rows);

  for (let k = 0; k < rows; k++) {
    dp[k] = new Array(matrix[k].length).fill(0);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == '1') {
        if (i == 0 || j == 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(...[dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]]) + 1;
        }
      }

      result = Math.max(result, dp[i][j]);
    }
  }

  return result ** 2;
};

var matrix = [
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0'],
];

console.log(maximalSquare(matrix));
