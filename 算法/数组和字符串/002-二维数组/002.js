/**
 * 螺旋矩阵
 *
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  /* const result = [];
  const len = matrix.length;
  const currLen = matrix[len - 1].length;

  console.log(matrix);
  for (let i = 0; i <= len; i++) {
    if (len != currLen) continue;
    const res = matrix.splice(0, 1);
    result.push(...res);
    matrix.unshift(Array(currLen).fill(undefined));
    rotate(matrix);
  }

  // 如何解决 长宽不等的 二维数组转换
  function rotate(matrix) {
    const len = matrix.length;

    for (let i = 0; i < len; i++) {
      for (let j = i; j < len; j++) {
        [matrix[j][i], matrix[i][j]] = [matrix[i][j], matrix[j][i]];
      }
    }

    matrix.reverse();
  }

  console.log(result); */
  if (matrix.length === 0) return [];
  if (matrix.length === 1) return matrix[0];

  var total = matrix.length * matrix[0].length,
    result = [],
    limit_x = matrix[0].length,
    limit_y = matrix.length,
    start_x = 0,
    start_y = 0,
    direction = 'top';
  var changeDirection = {
    top: function () {
      direction = 'right';
      let temp = [];
      for (let i = start_x; i < limit_x; i++) {
        temp.push(matrix[start_y][i]);
      }
      result = result.concat(temp);
      start_y++;
    },
    right: function () {
      direction = 'bottom';
      let temp = [];
      for (let i = start_y; i < limit_y; i++) {
        temp.push(matrix[i][limit_x - 1]);
      }
      result = result.concat(temp);
      limit_x--;
    },
    bottom: function () {
      direction = 'left';
      let temp = [];
      for (let i = start_x; i < limit_x; i++) {
        temp.unshift(matrix[limit_y - 1][i]);
      }
      result = result.concat(temp);
      limit_y--;
    },
    left: function () {
      direction = 'top';
      let temp = [];
      for (let i = start_y; i < limit_y; i++) {
        temp.unshift(matrix[i][start_x]);
      }
      result = result.concat(temp);
      start_x++;
    },
  };
  var backtrack = function () {
    if (result.length === total) {
      return;
    } else {
      changeDirection[direction]();
      backtrack();
    }
  };
  backtrack();
  return result;
};

var matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
console.log(spiralOrder(matrix));

/* 每取一排就翻转过来 */
// 1
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

[
  [undefined, 6, 9],
  [undefined, 5, 8],
  [undefined, 4, 7],
];

[
  [undefined, 8, 7],
  [undefined, 5, 4],
  [undefined, undefined, undefined],
];
[
  [undefined, undefined, undefined],
  [undefined, 5, 4],
  [undefined, undefined, undefined],
];

[
  [undefined, 4, undefined],
  [undefined, 5, undefined],
  [undefined, undefined, undefined],
];

// 2
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

[
  [8, 12],
  [7, 11],
  [6, 10],
  [5, 9],
];

[
  [11, 10, 9],
  [7, 6, 5],
];

[[5], [6], [7]];
