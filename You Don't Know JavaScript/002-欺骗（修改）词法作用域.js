var a = 22;

function foo() {
  eval("var a = 22222;");

  var b = 33;

  console.log(a, b);
}

foo();

setTimeout("var b=33;console.log(b)", 300);
setInterval("var b=33;console.log(b)", 300);

const fn = new Function("a", "b", "console.log(a,b)");
fn(111, 222);

var obj1 = { a: 1 };
var obj2 = { b: 2 };

function foo(obj) {
  /*
   * 将参数 obj 当做一个作用域，其属性当做该作用域中的变量。
   * 在 obj2 这个作用域中没有找到（LHS查询）a
   * 依次往上层作用域找都没有，于是创建一个全局变量 a
   */
  with (obj) {
    a = 222;
  }
}

foo(obj1);
foo(obj2);

console.log(obj1);
console.log(obj2);
console.log(a);

/* => 词法作用域的修改，导致编译时做的优化（预测变量的位置）变成无用功。且有可能污染全局作用域 */
