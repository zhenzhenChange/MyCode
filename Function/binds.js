/* => 1.指定上下文（如果没有传参，默认为window） */
function MyCall(ctx = window, ...args) {
  /* => 2.给上下文添加一个fn函数，赋值为调用者 */
  ctx.fn = this;

  /* => 3.执行fn函数（有参数则传入参数），有返回值则返回 */
  const result = ctx.fn(...args);

  /* => 4.删除该函数 */
  Reflect.deleteProperty(ctx, "fn");

  return result;
}

/* => 5.绑定至函数的原型 */
Function.prototype.MyCall = MyCall;

const obj = { name: "zhenzhen" };

function Person(args) {
  console.log(this.name);
  console.log(args);
}

Person.MyCall(obj, 30);

function MyApply(ctx = window, args) {
  ctx.fn = this;
  const result = ctx.fn(args);
  Reflect.deleteProperty(ctx, "fn");
  return result;
}

Function.prototype.MyApply = MyApply;

Person.MyApply(obj);
