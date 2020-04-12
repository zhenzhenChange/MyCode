/**
 * 加一
 *
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  plus(digits.length - 1, digits);
  function plus(index, arr) {
    var result = ++arr[index];
    if (result === 10) {
      if (arr[0] === 10) {
        arr[0] = 0;
        arr.unshift(1);
      } else {
        arr[index] = 0;
        plus(--index, arr);
      }
    }
  }
  return digits;
};

var digits = [9, 9, 9];
const res = plusOne(digits);
console.log(res);
