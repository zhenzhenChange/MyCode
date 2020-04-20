/**
 * 帕斯卡三角形
 *
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  if (!numRows) return [];

  const ary = [[1]];

  for (let i = 1; i < numRows; i++) {
    ary[i] = [];

    for (let j = 0; j < i + 1; j++) {
      if (i < 1 || j < 1 || j >= i) ary[i][j] = 1;
      else ary[i][j] = ary[i - 1][j] + ary[i - 1][j - 1];
    }
  }

  return ary;
};

var numRows = 5;
console.log(generate(numRows));
