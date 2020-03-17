const MyPromise = require("./MyPromise.js");

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("123");
  }, 11111);
});

MyPromise.reject(p1).then(
  res => {
    console.log("res " + res);
  },
  err => {
    console.log("err " + err);
  },
);
