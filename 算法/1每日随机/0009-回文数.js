/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = (x) => [...String(x)].reverse().join('') == String(x);

var x = 11;
console.log(isPalindrome(x));
