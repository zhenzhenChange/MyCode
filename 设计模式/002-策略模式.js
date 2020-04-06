/*
 * 策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互转换。
 * 1.一组策略类，封装了具体的算法（业务规则），并负责具体的计算过程；
 * 2.一个环境类，接受用户的请求，随后将请求委托给某一个策略类。
 */

/* 案例：根据员工的工资基数和绩效等级计算年终奖 */

/* => 面向对象版 */

// 1.一组策略类
var S = function () {};
S.prototype.calculate = (salary) => salary * 4;

var A = function () {};
A.prototype.calculate = (salary) => salary * 3;

var B = function () {};
B.prototype.calculate = (salary) => salary * 2;

// 2.一个环境类
var Bonus = function () {
  this.salary = null;
  this.strategy = null;
};

// 3.设置工资基数
Bonus.prototype.setSalary = function (salary) {
  this.salary = salary;
};

// 4.设置应用策略
Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy;
};

// 5.委托策略计算
Bonus.prototype.calculateBonus = function () {
  return this.strategy.calculate(this.salary);
};

var bonus = new Bonus();

bonus.setSalary(22222);
bonus.setStrategy(new S());
console.log(bonus.calculateBonus());

bonus.setSalary(11111);
bonus.setStrategy(new A());
console.log(bonus.calculateBonus());

/* ==================================================== */

/* => 关联委托版 */

// 1.策略组对象
var strategies = {
  S: (salary) => salary * 4,
  A: (salary) => salary * 3,
  B: (salary) => salary * 2,
};

// 2.环境函数
var calculateBonus = (level, salary) => strategies[level](salary);

console.log(calculateBonus('S', 10000));
console.log(calculateBonus('A', 10000));
