// 状态值：pending、fulfilled、rejected
const PENDING = "pending"; // => 等待态
const FULFILLED = "fulfilled"; // => 成功态
const REJECTED = "rejected"; // => 失败态

const ERROR = "不能返回Promise本身，否则会造成循环引用，无限递归";

const resolvePromise = (newPromise, x, resolve, reject) => {
  // 判断是否为同一个，不能返回Promise本身，否则会造成循环引用，无限递归
  if (newPromise === x) return reject(new TypeError(ERROR));

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called;

    try {
      const then = x.then;

      if (typeof then === "function") {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;

            resolvePromise(newPromise, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;

            reject(r);
          },
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;

      reject(e);
    }
  } else {
    resolve(x);
  }
};

const isPromise = x => {
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    return typeof x.then === "function";
  }
  return false;
};

class MyPromise {
  constructor(executor) {
    // 状态，默认为 pending
    this.status = PENDING;

    // 成功的结果
    this.value = undefined;

    // 失败的原因
    this.reason = undefined;

    // 成功的池子
    this.resolveArray = [];

    // 失败的池子
    this.rejectArray = [];

    // 成功的回调
    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        // 发布
        this.resolveArray.forEach(fn => fn());
      }
    };

    // 失败的回调
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        // 发布
        this.rejectArray.forEach(fn => fn());
      }
    };

    try {
      // 立即执行
      executor(resolve, reject);
    } catch (e) {
      // 异常则执行错误的回调
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : val => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : val => {
            throw val;
          };

    const newPromise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // 订阅
      if (this.status === PENDING) {
        this.resolveArray.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.rejectArray.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return newPromise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    /* const P = this.constructor;
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason =>
        P.resolve(callback()).then(() => {
          throw reason;
        }),
    ); */
    return this.then(
      value => {
        callback();
        return value;
      },
      reason => {
        callback();
        return reason;
      },
    );
  }

  // TODO ...
  /*
   * 该Promise.allSettled()方法返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果。
   * 它当前处于 TC39 第四阶段草案（Stage 4）
   */
  allSettled() {}

  static promisify(fn) {
    return (...args) =>
      new MyPromise((resolve, reject) => {
        fn(...args, (err, data) => {
          if (err) reject();
          resolve(data);
        });
      });
  }

  // TODO...
  /*
   * Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 完成，就返回那个已经有完成值的 promise 。
   * 如果可迭代对象中没有一个 promise 完成（即所有的 promises 都失败/拒绝），就返回一个拒绝的 promise，返回值还有待讨论：
   * 无非是拒绝原因数组或AggregateError类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。
   * 本质上，这个方法和Promise.all()是相反的。
   *
   * 注意！ Promise.any() 方法依然是实验性的，尚未被所有的浏览器完全支持。它当前处于 TC39 第三阶段草案（Stage 3）
   */
  static any() {}

  static all(promises) {
    if (!Array.isArray(promises)) throw new TypeError("Iterable Is Not Array");
    return new MyPromise((resolve, reject) => {
      const results = [];
      let count = 0;

      const processData = (i, data) => {
        results[i] = data;
        if (++count === promises.length) {
          resolve(results);
        }
      };

      promises.forEach((promise, index) => {
        let item = promises[index];
        if (isPromise(item)) {
          promise.then(data => {
            processData(index, data);
          }, reject);
        } else {
          processData(index, item);
        }
      });
    });
  }

  static race(promises) {
    if (!Array.isArray(promises)) throw new TypeError("Iterable Is Not Array");
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject);
      });
    });
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (isPromise(value)) {
        return value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      if (isPromise(reason)) {
        return reason.then(resolve, reject);
      } else {
        reject(reason);
      }
    });
  }
}

/* 单元测试 */
MyPromise.deferred = function() {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
