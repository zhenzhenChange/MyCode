/* 参数：L -- 左表达式，R -- 右表达式 */
function MyInstanceof(L, R) {
  const rightVal = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) return false;
    if (L === rightVal) return true;

    L = L.__proto__;
  }
}

/* 有问题 */
console.log(MyInstanceof(1, Object));
console.log(1 instanceof Object);
