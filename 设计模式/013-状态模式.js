/**
 * 状态模式：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类
 * 1.区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变
 * 2.将事物的每种状态都封装成单独的类
 * 3.跟此种状态有关的行为都被封装在这个类的内部
 */

// 电灯程序
class Light {
  constructor() {
    this.state = 'off';
    this.button = null;
  }

  init() {
    const button = document.createElement('button');

    button.innerHTML = '开关';
    this.button = document.body.appendChild(button);

    this.button.onclick = () => this.buttonWasPressed();
  }

  // 当项目复杂起来，就会存在大量的条件判断语句
  buttonWasPressed() {
    if (this.state == 'off') {
      console.log('开灯');
      this.state = 'on';
    } else if (this.state == 'on') {
      console.log('关灯');
      this.state = 'off';
    }
  }
}

const light = new Light();
light.init();

// 状态模式重构
class OffLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('弱光');
    this.light.setNextState(this.light.weakLightState);
  }
}

class WeakLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('强光');
    this.light.setNextState(this.light.strongLightState);
  }
}

class StrongLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('关灯');
    this.light.setNextState(this.light.offLightState);
  }
}

class Light {
  constructor() {
    this.button = null;

    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
  }

  init() {
    const button = document.createElement('button');

    button.innerHTML = '开关';
    this.button = document.body.appendChild(button);

    this.currState = this.offLightState;

    // 将请求委托给当前的状态对象
    this.button.onclick = () => this.currState.buttonWasPressed();
  }

  setNextState(nextState) {
    this.currState = nextState;
  }
}

const light = new Light();
light.init();

// 闭包无类版本（FSM状态机）
const delegate = (context, delegation) => ({ buttonWasPressed: (...args) => delegation.buttonWasPressed.apply(context, args) });

const FSM = {
  on: {
    buttonWasPressed() {
      console.log('关灯');
      this.button.innerHTML = '下一次按我是开灯';
      this.currState = this.offState;
    },
  },
  off: {
    buttonWasPressed() {
      console.log('开灯');
      this.button.innerHTML = '下一次按我是关灯';
      this.currState = this.onState;
    },
  },
};

class Light {
  constructor() {
    this.onState = delegate(this, FSM.on);
    this.offState = delegate(this, FSM.off);

    this.currState = this.offState;
    this.button = null;
  }

  init() {
    const button = document.createElement('button');

    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);

    this.button.onclick = () => this.currState.buttonWasPressed();
  }
}

const light = new Light();
light.init();
