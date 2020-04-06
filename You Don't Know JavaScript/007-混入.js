/*
 * 混入（extend / mixin）：实现对象的复制
 */

/* => 显示混入 */
function mixin(source, target) {
  for (let key in source) {
    /* => 浅克隆且只复制不存在的属性 */
    if (!(key in target)) target[key] = source[key];
  }

  return target;
}

var Vehicle = {
  engines: 1,
  ignition: function () {
    console.log('打开引擎.');
  },
  drive: function () {
    this.ignition();
    console.log('驾驶和前进!');
  },
};

var Car = mixin(Vehicle, {
  wheels: 4,
  drive: function () {
    Vehicle.drive.call(this);
    console.log(this.wheels + '个轮子一起滚动!');
  },
});

Car.drive();

/* ========================================================= */

/* => 寄生继承 */
// 父函数
function Vehicle() {
  this.engines = 1;
}

Vehicle.prototype.ignition = function () {
  console.log('打开引擎.');
};

Vehicle.prototype.drive = function () {
  this.ignition();
  console.log('驾驶和前进!');
};

// 寄生函数
function Car() {
  var car = new Vehicle();
  car.wheels = 4;

  // 缓存父函数方法
  var VDrive = car.drive;

  // 显示伪多态重写方法，再调用父函数方法
  car.drive = function () {
    VDrive.call(this);
    console.log(this.wheels + '个轮子一起滚动!');
  };

  return car;
}

Car().drive();

/* ========================================================= */

/* => 隐式混入 */
var Something = {
  cool: function () {
    this.name = 'zhenzhen';
    this.count = this.count ? this.count++ : 1;
  },
};
Something.cool();
console.log(Something);
console.log(Something.name);
console.log(Something.count);

var Another = {
  cool: function () {
    // 隐式
    Something.cool.call(this);
  },
};
Another.cool();
console.log(Another);
console.log(Another.name);
console.log(Another.count);
