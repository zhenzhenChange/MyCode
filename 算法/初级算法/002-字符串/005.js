/**
 * 验证回文字符串
 *
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  /* 1.
    var regExp = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g;
    var str = s.replace(regExp, '').toLowerCase();
    var start = Math.floor(str.length / 2);
    var end = Math.ceil(str.length / 2);
    var startStr = str.substr(0, start);
    if (start != end) {
      if (startStr == [...str.substr(start + 1, end)].reverse().join('')) return true;
      else return false;
    } else {
      if (startStr == [...str.substr(start, end)].reverse().join('')) return true;
      else return false;
    }
  */
  // 2.双指针
  const str = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    if (str.charAt(start) != str.charAt(end)) return false;
    start++;
    end--;
  }

  return true;
};

var s = 'A man, a plan, a canal: Panama';
var s = 'race a car';
var result = isPalindrome(s);
console.log(result);
