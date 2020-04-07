const obj = {
  null: null,
  number: 42,
  string: '22',
  regExp: /hello/,
  date: new Date(),
  array: [1, 2, 3],
  symbol: Symbol(2),
  undefined: undefined,
  object: { name: 'zhenzhen' },
  [Symbol('Symbol')]: 'I am Sysmbol1',
  [Symbol.toStringTag]: 'zhenzhen',
  function: function () {
    console.log('111');
    return 1;
  },
};

// 自身循环引用
obj.selfLoop = obj;

// 间接循环引用
/* const ooo = { i: obj };
obj.indirectLoop = ooo; */

// 扩展 JSON 静态方法，为实现深克隆
function MyJSON(data) {
  Reflect.defineProperty(data, 'toJSON', {
    value: function () {
      const newObj = {};
      const callToString = Object.prototype.toString;

      /* Object.keys 和 for in 循环只能获取自身的非 Symbol 属性，如此还需要配合 Object.getOwnPropertySymbols  */
      Reflect.ownKeys(data).forEach((key) => {
        const val = data[key];

        // 处理不安全 JSON 值（手动转为字符串）
        if (
          typeof val === 'function' ||
          typeof val === 'symbol' ||
          typeof val === 'undefined' ||
          callToString.call(val) === '[object Date]' ||
          callToString.call(val) === '[object RegExp]'
        ) {
          /* => 为什么不调用 val.toString() ，如果 val 是 undefined 就会报错 */
          newObj[key] = String(val);
        } else {
          newObj[String(key)] = val;
        }

        // 处理自身循环引用
        // TODO：处理间接循环引用
        if (data === val) {
          delete newObj[key];
        }
      });

      // 删除私有属性
      delete newObj['toJSON'];

      return newObj;
    },
  });

  const result = JSON.stringify(obj, null, 2);
  const parseResult = JSON.parse(result);

  // 反序列化不安全 JSON 值（都是字符串值）
  for (const key in parseResult) {
    const val = parseResult[key];

    // 匹配 Symbol undefined
    if (/Symbol(.*)/.test(val) || /undefined/.test(val)) {
      parseResult[key] = eval(val);
    }

    // 匹配 function
    if (/function/.test(val) && /(.*)/.test(val) && /{/.test(val) && /}/.test(val)) {
      parseResult[key] = eval('(' + val + ')');
    }

    // 匹配 Date
    if (/GMT/.test(val) && /(.*)/.test(val)) {
      parseResult[key] = new Date(val);
    }

    if (/\/(.*)\//.test(val)) {
      parseResult[key] = new RegExp(RegExp.$1);
    }

    // Symbol 属性定义不可枚举
    if (/Symbol(.*)/.test(key)) {
      delete parseResult[key];

      const content = [...RegExp.$1];
      content.pop();
      content.shift();

      // 瑕疵 3
      parseResult[eval(content.join(''))] = val;
    }
  }

  return parseResult;
}

/*
 * 瑕疵：
 * 1.如果原本对象中的属性的值字符串含有 Symbol undefined function(){} Date类型的也会被反序列化；
 * 2.正则匹配有可能会出现误判，如第 2 点；
 * 3.Symbol 作为属性会产生一些问题
 *
 * TODO
 * 1.间接循环引用问题
 *
 * */
const result = MyJSON(obj);

console.log(obj);
console.log(result);

console.log(result.date === obj.date);
console.log(result.array === obj.array);
console.log(result.object === obj.object);
console.log(result.regExp === obj.regExp);
console.log(result.function === obj.function);
