/**
 * 有效的括号
 *
 * 洋葱栈：Vue 中解析 HTML 模板成 AST 用的是这种方法
 *
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const ary = [];
  if (s.length % 2) return false; // 为 0 说明字符串是偶数，保证了配对的前提

  for (const char of s) {
    switch (char) {
      case '(':
        ary.push(char);
        break;
      case '{':
        ary.push(char);
        break;
      case '[':
        ary.push(char);
        break;
      case ')':
        if (ary.pop() !== '(') return false;
        break;
      case '}':
        if (ary.pop() !== '{') return false;
        break;
      case ']':
        if (ary.pop() !== '[') return false;
        break;
    }
  }

  return !ary.length;
};

var s = '{[]}';
console.log(isValid(s));
