/* 对于发布者（Dep）来说，监听者（Watcher） 是 发布者（Dep） 的订阅者 */
/* 即监听者和订阅者是同一个 */
class ZhenVue {
  constructor(options) {
    this.$el = options.el;
    this.$options = options;
    this.$data = options.data();

    // 初始化数据，给每个属性设置 set / get
    /* 数据劫持监听，收集依赖  */
    this.observe(this.$data);

    // 编译模板，同时创建监听器
    new Compiler(this.$el, this);

    // 生命周期 created() 方法，且指定上下文为当前 vm 实例，created() 方法里可通过 this.xxx 访问数据对象
    options.created && options.created.call(this);
  }

  observe(dataObj) {
    // 如果数据对象不存在或者不是一个对象
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
    this.observe(val);

    // 每个dep实例与data中的每个key一一对应
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 如果监听者存在，则添加至订阅数组，第一次的时候是没有的
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal) {
        // 如果新值与旧值相等，则不执行更新
        if (newVal === val) return;

        // 赋新值
        val = newVal;

        // 通知数据更新
        dep.notify();
      },
    });
  }
}

/* 管理所有的Watcher */
class Dep {
  constructor() {
    // 初始化一个订阅者数组（事件池），存储所有的依赖
    this.deps = [];
  }

  // 添加监听者方法
  addDep(dep) {
    // 将监听者添加至订阅者数组（没有去重处理）
    this.deps.push(dep);
  }

  // 通知数据更新
  notify() {
    // 遍历订阅者数组，逐一通知监听者执行更新
    this.deps.forEach(dep => dep.update());
  }
}

class Watcher {
  constructor(vm, key, cb) {
    // 缓存实例、数据对象中的属性、回调函数
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    //  将发布者的 target 指向当前监听者
    Dep.target = this;

    // 初始化数据，访问了 key 即可触发更新
    this.vm[this.key];

    // 避免缓存、利于垃圾收集、助于下一次创建
    Dep.target = null;
  }

  /* 订阅发布者的更新 */
  update() {
    // 执行回调函数，指定上下文为当前实例，参数为当前 key 的值 vm[key]
    this.cb.call(this.vm, this.vm[this.key]);
  }
}
