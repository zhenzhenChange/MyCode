/* => 迭代器 */
var obj = {
  a: "a",
  b: "b",
  [Symbol.iterator]: function() {
    var i = 0;
    var self = this;
    var keys = Object.keys(this);
    return {
      next: function() {
        var obj = { value: self[keys[i++]], done: i > keys.length };
        if (obj.done) delete obj.value;
        return obj;
      },
    };
  },
};

for (let val of obj) {
  console.log(val);
}

var res = obj[Symbol.iterator]();
console.log(res.next());
console.log(res.next());
console.log(res.next());
