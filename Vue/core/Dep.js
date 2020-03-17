class Dep {
  constructor() {
    // 初始化一个订阅者数组（事件池）
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
