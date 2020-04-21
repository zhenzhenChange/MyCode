/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = (n) => +`0b${[...n.toString(2).padStart(32, 0)].reverse().join('')}`;

var n = 43261596;
console.log(reverseBits(n));
