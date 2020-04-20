/*
 * 模板方法模式：将子类相同的行为抽离至父类，将不同的行为由子类具体实现（泛化）
 * 1.抽象父类
 * 2.实现子类
 * 3.严重依赖抽象类
 */

/* 咖啡与茶 */

// 咖啡
class Coffee {
  constructor() {}

  boilWater() {
    console.log('把水煮沸');
  }

  brewedCoffee() {
    console.log('用沸水冲泡咖啡');
  }

  pourInCup() {
    console.log('倒进杯子');
  }

  addSugarAndMilk() {
    console.log('添加糖和牛奶');
  }

  init() {
    this.boilWater();
    this.brewedCoffee();
    this.pourInCup();
    this.addSugarAndMilk();
  }
}

const coffee = new Coffee();
coffee.init();

// 茶
class Tea {
  constructor() {}

  boilWater() {
    console.log('把水煮沸');
  }

  soakTea() {
    console.log('用沸水浸泡茶叶');
  }

  pourInCup() {
    console.log('倒进杯子');
  }

  addLemon() {
    console.log('添加柠檬');
  }

  init() {
    this.boilWater();
    this.soakTea();
    this.pourInCup();
    this.addLemon();
  }
}

const tea = new Tea();
tea.init();

/*
 * 共同点：烧开水、泡、倒进杯子、添加调味品
 * 不同点：原料、调味品
 */

// 材料
class Material {
  constructor(material) {
    this.material = material;
  }

  boilWater() {
    console.log('烧开水...');
  }

  bubble() {}

  pourInCup() {
    console.log(`将${this.material}倒进杯子`);
  }

  addCondiments() {}

  hook() {
    return true;
  }

  // 模板方法：封装了子类的算法框架，指导子类以何种顺序去执行何种方法。
  init() {
    this.boilWater();
    this.bubble();
    this.pourInCup();

    // 控制变化：是否需要添加调味品
    this.hook() && this.addCondiments();
  }
}

class Coffee extends Material {
  constructor(coffee) {
    super(coffee);
  }

  bubble() {
    console.log('冲泡咖啡');
  }

  addCondiments() {
    console.log('添加糖和牛奶');
  }
}

class Tea extends Material {
  constructor(tea) {
    super(tea);
  }

  bubble() {
    console.log('浸泡茶叶');
  }

  // 使用钩子控制，不需要调味品：由子类主动调用，而不是父类询问子类是否需要调用
  hook() {
    return false;
  }
}

const coffee = new Coffee('coffee');
const tea = new Tea('tea');
coffee.init();
tea.init();

/* 函数形式 */
function Material(options) {
  function boilWater() {
    console.log('烧开水');
  }

  function pourInCup() {
    console.log('倒进杯子');
  }

  const bubble = options.bubble;
  const addCondiments = options.addCondiments;

  function Fn() {}

  Fn.prototype.init = function () {
    boilWater();
    bubble();
    pourInCup();
    addCondiments();
  };

  return Fn;
}

const Coffee = Material({
  bubble() {
    console.log('冲泡咖啡');
  },
  addCondiments() {
    console.log('添加糖和牛奶');
  },
});

const Tea = Material({
  bubble() {
    console.log('浸泡茶叶');
  },
  addCondiments() {
    console.log('添加柠檬');
  },
});

const coffee = new Coffee();
coffee.init();

const tea = new Tea();
tea.init();
