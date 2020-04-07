/*
 * 代理模式：当客户不方便直接访问一个对象或者不满足需要时，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。
 *          替身对象对请求做一系列处理之后，再转交给本体对象。
 *
 * 保护代理：替身对象过滤不符合要求的请求，符合要求的请求将转交给本体对象。（控制不同权限的对象对目标对象的访问）
 * 虚拟代理：当某些条件通过替身对象的过滤后，再去创建（需要时再创建，节省内存消耗）。
 * 缓存代理：对运算结果提供存储。在下次运算时，如果传递的参数和上一次相同，则直接返回上一次的运算结果。
 */

// 缓存代理
var pow = function (...args) {
  var x = 1;

  args.forEach((v) => (x *= v));

  return x;
};

var add = function (...args) {
  var x = 0;

  args.forEach((v) => (x += v));

  return x;
};

// 缓存代理工厂函数
var createProxyFactory = function (fn) {
  var cache = {};

  return function (...args) {
    var argStr = args.join(',');

    if (argStr in cache) return cache[argStr];

    return (cache[argStr] = fn.apply(this, args));
  };
};

var proxyPow = createProxyFactory(pow);
var proxyAdd = createProxyFactory(add);

console.log(proxyPow(1, 2, 3, 4));
console.log(proxyPow(1, 2, 3, 4));
console.log(proxyAdd(1, 2, 3, 4));
console.log(proxyAdd(1, 2, 3, 4));
