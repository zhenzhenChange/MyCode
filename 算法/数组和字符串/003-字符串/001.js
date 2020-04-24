/**
 * 二进制求和
 *
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = (a, b) => (BigInt(`0b${a}`) + BigInt(`0b${b}`)).toString(2);

var a = '1010';
var b = '1011';

console.log(addBinary(a, b));
