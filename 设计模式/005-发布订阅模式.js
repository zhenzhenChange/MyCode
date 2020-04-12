/* Publish And Subscribe Mode */

/* => 发布者 */
const publisher = {
  /* => 订阅者列表（分类） */
  subscribers: {},

  /* => 添加订阅者 */
  addSubscriber(sub, callback) {
    /* => 如果新分类不存在，则创建空间 */
    if (!this.subscribers[sub]) this.subscribers[sub] = [];

    /* => 存入订阅者 */
    this.subscribers[sub].push(callback);
  },

  /* => 发布通知 */
  releaseNotice(sub, ...args) {
    this.subscribers[sub].forEach((cb) => cb.call(this, ...args));
  },

  /* => 移除订阅者 */
  removeSubscriber(sub, callback) {
    let cbs = this.subscribers[sub];

    /* => 代表 sub 没有任何订阅 */
    if (!cbs || cbs.length === 0) return false;

    /* => 如果不传回调，则清空该订阅者的所有回调 */
    if (!callback) {
      cbs.length = 0;
      return true;
    }

    /* => 不相等则返回 */
    this.subscribers[sub] = cbs.filter((cb) => cb !== callback);
  },
};

function fn(time, info) {
  console.log('ming1', time, info);
}

function fn2(time, info) {
  console.log('ming2', time, info);
}

publisher.addSubscriber('ming', fn);
publisher.addSubscriber('ming', fn2);

publisher.addSubscriber('zhen', (time, info) => console.log('zhen', time, info));

publisher.releaseNotice('ming', '326', '你好');
publisher.releaseNotice('zhen', '3262', '你好2');

publisher.removeSubscriber('ming', fn2);
publisher.removeSubscriber('zhen');

publisher.releaseNotice('ming', '326', '你好');
publisher.releaseNotice('zhen', '326', '你好');
