/*
 * 职责链模式：将对象连成一条链，沿着该链传播请求，直到有一个对象处理该请求为止（原型链）
 * 1.请求发送者只需要知道链中的第一个节点对象
 * 2.弱化发送者和一组接收者之间的强联系
 * 3.可以指定起点
 */

function order500(type, isPay, stock) {
  if (type == 1 && isPay) console.log('500 + 100');
  else return 'next';
}

function order200(type, isPay, stock) {
  if (type == 2 && isPay) console.log('200 + 50');
  else return 'next';
}

function orderNormal(type, isPay, stock) {
  if (stock) console.log('normal');
  else console.log('no stock');
}

/* 类形式 */
class Chain {
  constructor(order) {
    this.order = order;
    this.next = null;
  }

  // 设置当前节点的下一个节点
  setNext(next) {
    this.next = next;
  }

  request(...args) {
    // 调用函数返回结果，传播到下一个节点
    const result = this.order.apply(this, args);

    if (result == 'next') {
      return this.next && this.next.request.apply(this.next, args);
    }

    return result;
  }
}

const chain500 = new Chain(order500);
const chain200 = new Chain(order200);
const chainNormal = new Chain(orderNormal);

chain500.setNext(chain200);
chain200.setNext(chainNormal);

chain500.request(1, true, 500);
chain500.request(1, false, 500);
chain500.request(1, false, 0);
chain500.request(2, true, 500);
chain500.request(3, true, 500);

/* 函数式（类似柯里化）AOP */
Function.prototype.MyAfter = function (fn) {
  return (...args) => {
    const result = this.apply(this, args);

    if (result == 'next') return fn.apply(this, args);

    return result;
  };
};

const order = order500.MyAfter(order200).MyAfter(orderNormal);
order(1, true, 500);
order(2, true, 500);
order(1, false, 500);
order(1, false, 0);
