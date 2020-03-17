# 手写实现JavaScript中的方法、函数、关键字



## new



## apply



## call



## bind



## 一键粘贴功能：使用事件（onselet、oncopy、oncut、onpaste）





```javascript
/**
 * 使用硬币来凑成指定的金额
 *
 * 说明：给定不同面额的硬币 coins 和一个总金额 amount，
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数，
 * 如果没有任何一种硬币组合能组成总金额，返回 -1，
 * 你可以认为每种硬币的数量是无限的。
 *
 * 示例：
 * coinChange([1, 2, 5], 11); // 3
 * coinChange([2, 4], 3); // -1
 */
coinChange([1, 2, 5], 11);
function coinChange(coins: Array<number>, amount: number): number {
  /** TODO:代码实现 */

  if (Array.isArray(coins)) {
    coins.forEach(item => {});
  } else {
    console.log("conins 不是一个数组~");
  }
  return 1;
}

/**
 * 价格数组转换成可读性更好的文本序列
 * 说明：有个数组，内部是。
 * 示例：
 * var input = [
 * {
 * "moqPe": 5,
 * "pricePe": 12.85
 * },
 * {
 * "moqPe": 15,
 * "pricePe": 11.36
 * }
 * ]
 * var output = rangeStringify(input);
 *
 * // output: "¥12.85 (5-15); ¥11.36 (≥15个)"
 */
var input = [
  {
    moqPe: 5,
    pricePe: 12.85,
  },
  {
    moqPe: 15,
    pricePe: 11.36,
  },
];

// console.log(rangeStringify(input));

function rangeStringify(input: Array<any>): string {
  /* TODO: 代码实现 */
  let str: string;
  input.forEach(item => {
    const moqPe = item.moqPe;
    const pricePe = item.pricePe;
    if (moqPe < 5) {
      str += `¥${pricePe}（<5）;`;
    } else if (moqPe < 15 && moqPe >= 5) {
      str += `¥${pricePe}（5-15）;`;
    } else if (moqPe >= 15) {
      str += `¥${pricePe}（≥15个）;`;
    }
  });
  return str;
}

/**
 * 字符串隐藏部分内容
 * 说明：实现一个方法，接收一个字符串和一个符号，将字符串中间四位按指定符号隐藏
 * 1. 符号无指定时使用星号（*）
 * 2. 接收的字符串小于或等于四位时，返回同样长度的符号串，等同于全隐藏，如 123，隐藏后是 ***
 * 3. 字符串长度是大于四位的奇数时，如 123456789，隐藏后是 12****789，奇数多出来的一位在末尾
 * 示例：
 * mask('alibaba', '#'); // a####ba
 * mask('85022088'); // 85****88
 * mask('hello'); // ****o
 * mask('abc', '?'); // ???
 * mask('阿里巴巴集团', '?'); // 阿????团
 */

console.log(mask("alibaba", "#"));
console.log(mask("85022088"));
console.log(mask("hello"));
console.log(mask("abc", "?"));
console.log(mask("阿里巴巴集团", "?"));

function mask(str: string, char: string = "*"): string {
  /* TODO:代码实现 */

  let newStr: string;
  const length = str.length;

  if (length <= 4) {
    // 不懂 使用字符串方法 repeat() 编译过程报错，但能编译成功
    newStr = char.repeat(str.length);
  } else if (length > 4) {
    // 总长度减去4位隐藏符号 -- 剩余长度
    const surplusLength = length - 4;
    // 重复4位隐藏符号
    const char4 = char.repeat(4);

    if (length % 2 === 0) {
      // 偶数
      newStr = str.substr(0, surplusLength / 2) + char4 + str.substr(-(surplusLength / 2));
    } else {
      // 奇数
      if (surplusLength <= 1) {
        newStr = str.substr(0, (surplusLength % 2) - 1) + char4 + str.substr(-(surplusLength % 2));
      } else {
        newStr = str.substr(0, surplusLength % 2) + char4 + str.substr(-(surplusLength % 2) - 1);
      }
    }
  }
  return newStr;
}

/** 
 * 平铺节点数组转嵌套树 
 * 说明：将一个包含深度信息的节点数组转换成一棵树，要求只能遍历一次该数组 
 * 输入值：TreeNode数组 TreeNode为包含title, depth(正整数，深度不限)字段的Object 
 * 输出值：组装好的嵌套树，子节点挂载在对应父节点的children字段上 
 
举例 (title字段仅为便于理解，实际无固定规则) 
输入：[ 
  { title: '1', depth: 1 }, 
  { title: '1-1', depth: 2 }, 
  { title: '1-1-1', depth: 3 }, 
  { title: '1-1-2', depth: 3 }, 
  { title: '1-2', depth: 2 }, 
  { title: '2', depth: 1 }, 
  { title: '2-1', depth: 2 }, 
] 
输出：[ 
  { 
    "title": "1", 
    "depth": 1, 
    "children": [ 
      { 
        "title": "1-1", 
        "depth": 2, 
        "children": [ 
          { 
            "title": "1-1-1", 
            "depth": 3 
          }, 
          { 
            "title": "1-1-2", 
            "depth": 3 
          } 
        ] 
      }, 
      { 
        "title": "1-2", 
        "depth": 2 
      } 
    ] 
  }, 
  { 
    "title": "2", 
    "depth": 1, 
    "children": [ 
      { 
        "title": "2-1", 
        "depth": 2 
      } 
    ] 
  } 
] 
*/
const arr = [
  { title: "1", depth: 1 },
  { title: "1-1", depth: 2 },
  { title: "1-1-1", depth: 3 },
  { title: "1-1-2", depth: 3 },
  { title: "1-2", depth: 2 },
  { title: "2", depth: 1 },
  { title: "2-1", depth: 2 },
];
depthArray2Tree(arr);

function depthArray2Tree(depthArray: Array<any>): Array<any> {
  /* TODO: code */
  // 1.计算 depth 相同的数字，相同的代表为同级
  // 2.计算 title 中含有 - 的个数，0个代表第1级，1个代表第2级，以此类推
  // 3.根据 - 的个数区分父子级

  // 按depth 从小到大 排序
  depthArray.sort((a, b) => a.depth - b.depth);

  const newArr = [];
  const length = depthArray.length;

  // 1
  for (let i = 0; i < length; i++) {
    if (depthArray[i].depth === depthArray[i + 1].depth) {
      newArr.push(depthArray[i]);
      newArr.push(depthArray[i + 1]);
    }
  }

  return newArr;
}

```

