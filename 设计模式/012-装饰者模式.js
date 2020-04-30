/**
 * 装饰者模式：给对象动态添加职责（功能）
 * 能够在不改变对象自身的基础上，在程序运行期间给对象动态添加职责
 * 1.将一个对象嵌入另一个对象之中，相当于这个对象被另一个对象包装起来，形成一条包装链。
 * 2.请求随着这条链依次传递到所有的对象，每个对象都有处理这条请求的集合。
 */

// 飞机大战，子弹型号随着等级的提升而升级
const plane = {
  fire() {
    console.log('发射普通子弹');
  },
};

function missileDecorator() {
  console.log('发射导弹');
}

function atomDecorator() {
  console.log('发射原子弹');
}

const fire1 = plane.fire;

plane.fire = function () {
  fire1();
  missileDecorator();
};

const fire2 = plane.fire;

plane.fire = function () {
  fire2();
  atomDecorator();
};

plane.fire();

// AOP 装饰函数
// 在原函数执行之前
Function.prototype.before = function (beforeFn) {
  return (...args) => {
    beforeFn.apply(this, args);
    return this.apply(this, args);
  };
};

// 在原函数执行之后
Function.prototype.after = function (afterFn) {
  return (...args) => {
    const result = this.apply(this, args);
    afterFn.apply(this, args);
    return result;
  };
};

function foo() {
  console.log(1);
}

foo = foo.before(function () {
  console.log('foo');
});

foo();

foo = foo.after(function () {
  console.log('foo after');
});

foo();
