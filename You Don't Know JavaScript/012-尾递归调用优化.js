'use strict';
/*
 * 尾调用：
 * 1.函数调用在另一个函数的结尾处，调用结束后无需执行其他代码（除了返回调用结果）
 * 2.调用一个新的函数需要额外的一块预留内存来管理调用栈，叫栈帧
 *
 * 尾调用优化：
 * 1.如果一个函数调用属于尾调用，那么引擎就不需要创建新的栈帧，而是就地重用上一个已有的栈帧。
 * 2.提高速度，节省内存。
 * 3.必须要在严格模式下启用
 *
 */

/* 非尾调用 */
function factorial(n) {
  if (n < 2) return 1;

  // 函数调用完成后，它还要执行乘法运算
  return n * factorial(n - 1);
}

var res = factorial(50000);
console.log(res);

/* 尾调用 */
function factorial(n) {
  function fact(n, result) {
    if (n < 2) return result;

    // 函数调用完成后，只返回调用结果
    return fact(n - 1, n * result);
  }

  // 函数调用完成后，只返回调用结果
  return fact(n, 1);
}

var res = factorial(50000);
console.log(res);
