class Observer {
  constructor(data) {
    this.data = data;
    this.observer(this.data);
  }

  observer(dataObj) {
    // 如果数据对象不存在或者不是一个对象，则不观测
    if (!dataObj || typeof dataObj !== "object") return;

    // 遍历数据对象
    Object.keys(dataObj).forEach(key => {
      // 响应式设置
      this.defineReactive(dataObj, key, dataObj[key]);

      // 数据对象代理
      this.proxyData(key);
    });
  }

  proxyData(key) {
    // 将数据对象里的属性代理到当前vm实例（this），即可通过 this.xxx 访问数据对象中的属性
    Object.defineProperty(this, key, {
      get() {
        // this[key] 访问的时候 实际上访问的是 this.$data[key] ，跳到 defineReactive() 方法
        return this.$data[key];
      },
      set(newVal) {
        // 重新 set 值时也会触发 defineReactive() 方法
        this.$data[key] = newVal;
      },
    });
  }

  defineReactive(obj, key, val) {
    // 如果加入对象中的属性还是对象，则递归执行
    this.observer(val);

    // 创建一个调度中心
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 如果监听者存在，则添加至订阅数组，第一次的时候是没有的
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set: newVal => {
        // 如果新值与旧值相等，则不执行更新
        if (newVal === val) return;

        // 如果新值是一个对象，也进行观测
        this.observer(newVal);

        // 赋新值
        val = newVal;

        // 通知数据更新
        dep.notify();
      },
    });
  }
}
