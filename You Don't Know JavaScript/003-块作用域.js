/* => 函数内部 */
function foo() {}

/* => with 内部 */
with (window) {
}

/* => catch 内部 */
try {
} catch (error) {
  // here
}

/* => IIFE */
(function() {
  // here
})();

/* => let / const 关键字隐式劫持所在的作用域 */
if (true) {
  let bar = 3333;
  console.log(bar);
}

console.log(bar);

for (let i = 0; i < 10; i++) {
  console.log(i);
}
/* => 等价于↓ */
{
  let j;
  for (j = 0; j < 10; j++) {
    let i = j;
    console.log(i);
  }
}
