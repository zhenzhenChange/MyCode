/**
 * 杨辉三角 II
 *
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  let curr = 1;
  const ary = [];

  for (let i = 0; i <= rowIndex; i++) {
    ary[i] = curr;
    curr = (curr * (rowIndex - i)) / (i + 1);
  }

  return ary;
};

var rowIndex = 3;
console.log(getRow(rowIndex));
