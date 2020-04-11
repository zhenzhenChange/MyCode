/*
 * 迭代器模式：提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
 * 1.把迭代的过程从业务逻辑中分离出来
 * 2.不关心对象的内部构造
 * 3.按顺序访问其中的每个元素
 */

/**
 * @desc 内部迭代器：不用关系迭代器内部的实现，但迭代规则已固定。
 * @param {iterator[]} iterator
 * @param {callback()} callback
 * @return {void}
 */
function insideIterator(iterator, callback) {
  for (let i = 0; i < iterator.length; i++) {
    const result = callback.call(iterator[i], iterator[i], i);

    // 如果回调函数返回 false ，终止迭代
    if (result === false) break;
  }
}

var ary = [1, 2, 3, 4, 5];
inIterator(ary, function (cur, idx) {
  if (cur > 3) return false;
  console.log(idx, cur);
});

/**
 * @desc 外部迭代器：显示请求迭代下一个元素，手动控制迭代的过程或顺序。
 * @param {iterator[]} iterator
 * @param {callback()} callback
 * @return {void}
 */
function outsideIterator(iterator) {
  let current = 0;
  const length = iterator.length;

  // void 将返回值置为 undefined
  const next = () => void (current += 1);
  const done = () => current >= length;
  const getCurItem = () => iterator[current];

  return { next, done, getCurItem, length };
}

function compare(iterator1, iterator2) {
  if (iterator1.length !== iterator2.length) return '不等！';

  while (!iterator1.done() && !iterator2.done()) {
    if (iterator1.getCurItem() !== iterator2.getCurItem()) return '不等！';

    iterator1.next();
    iterator2.next();
  }

  return '相等！';
}

var ary1 = outsideIterator([1, 2, 3, 4, 5]);
var ary2 = outsideIterator([1, 2, 3, 4, 5]);

var result = compare(ary1, ary2);
console.log(result);

/* ============================================================== */

/*
 * 应用场景：功能兼容性处理
 * 一个函数在其它浏览器中都支持，在 IE 中不支持。则编写两个函数，迭代取值。
 * 按照优先级使用内部迭代器，若不支持则返回 false ，继续迭代下一个。
 * 若支持返回该函数，迭代结束。
 * */
