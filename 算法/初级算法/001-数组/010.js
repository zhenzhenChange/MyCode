/**
 * 有效的数独
 *
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  /* 
    var [row, col, block] = [new Map(), new Map(), new Map()];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (row.has(board[i][j])) return false;
        if (col.has(board[j][i])) return false;

        if (board[i][j] !== '.') row.set(board[i][j], j);
        if (board[j][i] !== '.') col.set(board[j][i], i);
      }
    } 
  */

  const result = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const val = board[i][j] - 1;

      if (val >= 0 && val <= 8) {
        const cur =
          (1 << j) | (1 << (i + 9)) | (1 << (Math.floor(i / 3) * 3 + Math.floor(j / 3) + 18));

        const old = result[val];

        if ((old & cur) === 0) {
          result[val] = old | cur;
        } else {
          return false;
        }
      }
    }
  }

  return true;
};

var board = [
  ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
var res = isValidSudoku(board);
console.log(res);
