const MyPromise = require("./MyPromise.js");

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("123");
  }, 1111);
});
p1.finally(() => {
  console.log(1);
});
