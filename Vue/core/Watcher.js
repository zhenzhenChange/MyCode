class Watcher {
  constructor(vm, key, cb) {
    // 缓存实例、数据对象中的属性、回调函数
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    // 将发布者的 target 指向当前监听者
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
