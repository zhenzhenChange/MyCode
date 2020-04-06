/* => 类风格 */
function Foo(who) {
  this.me = who;
}

Foo.prototype.identify = function() {
  return "I am " + this.me;
};

function Bar(who) {
  Foo.call(this, who);
}

// Bar.prototype = Object.create(Foo.prototype); // => constructor 已丢失
Object.setPrototypeOf(Bar.prototype, Foo.prototype);

Bar.prototype.speak = function() {
  console.log("Hello, " + this.identify() + " .");
};

var bar1 = new Bar("bar1");
var bar2 = new Bar("bar2");

bar1.speak();
bar2.speak();

/* => 对象关联风格 */
const FO = {
  init: function(who) {
    this.me = who;
  },
  identify: function() {
    return "I am " + this.me;
  },
};

// const BO = Object.create(FO);
const BO = {};
Object.setPrototypeOf(BO, FO);

BO.speak = function() {
  console.log("Hello, " + this.identify() + " .");
};

const BO1 = Object.create(BO);
const BO2 = Object.create(BO);

BO1.init("BO1");
BO2.init("BO2");

BO1.speak();
BO2.speak();
