/*
 * 享元模式：运用共享技术来有效支持大量细粒度的对象（性能优化）
 * 1.目标：尽量减少共享对象的数量
 * 2.内部状态：存储于对象内部、被一些对象共享、独立于具体的场景
 * 3.外部状态：取决于具体的场景，根据场景而变化，不能被共享
 *
 */

/* 创建了 100 个对象 */
class Model {
  constructor(sex, underwear) {
    this.sex = sex;
    this.underwear = underwear;
  }

  takePhoto() {
    console.log(`sex = ${this.sex} underwear = ${this.underwear}`);
  }
}

for (let i = 0; i < 50; i++) {
  const maleModel = new Model('male', `underwear${i}`);
  maleModel.takePhoto();
}

for (let i = 0; i < 50; i++) {
  const femaleModel = new Model('female', `underwear${i}`);
  femaleModel.takePhoto();
}

/* 抽离内部状态与外部状态 => 只有两个对象（有多少个内部状态就有多少个对象） */
class Model {
  constructor(sex) {
    this.sex = sex;
  }

  takePhoto() {
    console.log(`sex = ${this.sex} underwear = ${this.underwear}`);
  }
}

const maleModel = new Model('male');
const femaleModel = new Model('female');

for (let i = 0; i < 50; i++) {
  maleModel.underwear = `underwear${i}`;
  maleModel.takePhoto();
}

for (let i = 0; i < 50; i++) {
  femaleModel.underwear = `underwear${i}`;
  femaleModel.takePhoto();
}
