/* 自定义迭代器 */
// 无限斐波那契数列
const Fib = {
  [Symbol.iterator]() {
    let N1 = 1;
    let N2 = 1;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const curr = N2;
        N2 = N1;
        N1 = N1 + curr;
        return { value: curr, done: false };
      },
      return(value) {
        console.log('Ok...', value);
        return { value, done: true };
      },
    };
  },
};

for (const val of Fib) {
  console.log(val);
  if (val > 100) break;
}

const it = Fib[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.return(99));

// 单个数据元操作
Reflect.defineProperty(Number.prototype, Symbol.iterator, {
  writable: true,
  enumerable: false,
  configurable: true,
  value: function iterator() {
    let i,
      inc,
      done = false,
      top = +this;
    inc = 1 * (top < 0 ? -1 : 1);

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (!done) {
          if (i == null) i = 0;
          else if (top >= 0) i = Math.min(top, i + inc);
          else i = Math.max(top, i + inc);

          if (i == top) done = true;

          return { value: i, done: false };
        } else return { done: true };
      },
    };
  },
});

for (const i of 5) {
  console.log(i); // 0 1 2 3 4 5
}
console.log([...-5]); // [ 0, -1, -2, -3, -4, -5 ]

// 解构也消耗迭代器，如果是有限个数，可以 [a, b, c, ...d]
const ary = [1, 2, 3, 4, 5, 6];
const [a, b, c, ...d] = ary[Symbol.iterator]();
console.log(a, b, c, d);

// yield 委托
function* foo() {
  yield* [1, 2, 3];
}
const [a, b, c] = foo();
console.log(a, b, c);

// yield 委托递归
function* foo(x) {
  if (x < 3) x = yield* foo(x + 1);
  return x * 2;
}
console.log(foo(1).next().value);
/*
 * foo(1) => foo(2) => foo(3) ↓
 *   24   <=   12   <=    6   ←
 */

// 错误处理
function* foo() {
  try {
    yield 1;
  } catch (err) {
    console.log('内部：', err);
  }
  yield 2;
  throw '抛给外面！';
}

const it = foo();

console.log(it.next().value); // 1
try {
  console.log(it.throw('抛给内部！').value); // 内部：抛给内部！ | 2
  it.next();

  console.log('此处不会执行！');
} catch (err) {
  console.log('外面：', err); // 外面：抛给外面！
}

/* 自定义生成器 */
function MyGenerator() {
  let state = 0;

  function nextState(v) {
    switch (state) {
      case 0:
        state++;

        // 初始化启动生成器 默认丢弃第一个 next 传入的参数
        return 42;
      case 1:
        state++;
        console.log(v);
        return undefined;
    }
  }

  return {
    next(v) {
      const value = nextState(v);
      return { value, done: state == 2 };
    },
  };
}

const it = MyGenerator();
console.log(it.next());
console.log(it.next(11));
