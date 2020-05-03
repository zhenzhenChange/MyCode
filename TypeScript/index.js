// 基本类型注解
var num = 123;
var str = 'str';
var bool = true;
function foo(arg) {
  return arg;
}
var result = foo(num);
console.log(result);
// 数组注解
var bry = [];
bry.push([]);
var user;
user = {
  username: 'zhenzhen',
  password: '123456',
};
// 内联类型注解
var My;
My = {
  name: 'zhenzhen',
  age: 22,
};
// 特殊类型 any null undefined void
var any;
any = '1';
any = 1;
any = null;
any = undefined;
num = any;
bool = any;
function aaa(num) {
  void num;
}
// 泛型
function reverse(ary) {
  var result = [];
  for (var i = ary.length - 1; i >= 0; i--) {
    result.push(ary[i]);
  }
  return result;
}
var ary = [1, 2, 3];
var strAry = ['1', '2', '3'];
var results = reverse(ary);
var resultStr = reverse(strAry);
console.log(results);
console.log(resultStr);
results[0] = 1;
resultStr[0] = '1';
// 联合类型注解
function formatString(str) {
  var s = '';
  if (Array.isArray(str)) s = str.join('');
  else s = str.trim();
  return s;
}
var forStr = 'aa';
var forStrAry = ['aaa   ', 'bb', 'cc'];
var forResult = formatString(forStr);
console.log(forResult);
// 交叉类型
function extend(param, arg) {
  var result = {};
  for (var key in param) {
    result[key] = param[key];
  }
  for (var key in arg) {
    if (!result[key]) {
      result[key] = arg[key];
    }
  }
  return result;
}
var resultExtend = extend({ name: 'zhenzhen' }, { name: 'xiaozhenzhen', age: 22 });
console.log(resultExtend);
// 元组
var member;
member = ['1', 2, {}];
var memberStr = member[0],
  memberNum = member[1],
  memberObj = member[2]; // 解构
console.log(memberStr, memberNum, memberObj);
var typeAlias;
typeAlias = '123';
typeAlias = 123;
typeAlias = true;
typeAlias = { val: 123 };
// 类型断言
var Foo = 123;
var Bar = '123';
Bar = Foo;
function Baz() {
  return 123;
}
Bar = Baz() /*  as any */;
var MyPoint = /** @class */ (function () {
  function MyPoint() {}
  return MyPoint;
})();
var foos = new MyPoint();
foos.x;
// 枚举（数字类型）
var CardSuit;
(function (CardSuit) {
  CardSuit[(CardSuit['Clubs'] = 1)] = 'Clubs';
  CardSuit[(CardSuit['Diamonds'] = 2)] = 'Diamonds';
  CardSuit[(CardSuit['Hearts'] = 3)] = 'Hearts';
  CardSuit[(CardSuit['Spades'] = 4)] = 'Spades';
})(CardSuit || (CardSuit = {}));
var Card = CardSuit.Clubs;
Card = 123;
// 编译后
/*
  var CardSuit;
  (function (CardSuit) {
    CardSuit[(CardSuit['Clubs'] = 0)] = 'Clubs';
    CardSuit[(CardSuit['Diamonds'] = 1)] = 'Diamonds';
    CardSuit[(CardSuit['Hearts'] = 2)] = 'Hearts';
    CardSuit[(CardSuit['Spades'] = 3)] = 'Spades';
  })(CardSuit || (CardSuit = {}));
  var Card = CardSuit.Clubs;
  Card = 123;
  console.log(CardSuit);
*/
// 字符串型
var TypeEnum;
(function (TypeEnum) {
  TypeEnum['Error'] = 'error';
  TypeEnum['Success'] = 'success';
})(TypeEnum || (TypeEnum = {}));
var some = 'error';
var value = some;
console.log(value == TypeEnum.Error);
var lie = 0; /* False */
// 编译后
// var lie = 0 /* False */;
// 含有静态方法的枚举 （和命名空间合并）
var Weekday;
(function (Weekday) {
  Weekday[(Weekday['Monday'] = 0)] = 'Monday';
  Weekday[(Weekday['Tuesday'] = 1)] = 'Tuesday';
  Weekday[(Weekday['Wednesday'] = 2)] = 'Wednesday';
  Weekday[(Weekday['Thursday'] = 3)] = 'Thursday';
  Weekday[(Weekday['Friday'] = 4)] = 'Friday';
  Weekday[(Weekday['Saturday'] = 5)] = 'Saturday';
  Weekday[(Weekday['Sunday'] = 6)] = 'Sunday';
})(Weekday || (Weekday = {}));
(function (Weekday) {
  function isBusinessDay(day) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default:
        return true;
    }
  }
  Weekday.isBusinessDay = isBusinessDay;
})(Weekday || (Weekday = {}));
var mon = Weekday.Monday;
var sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon));
console.log(Weekday.isBusinessDay(sun));
// 开放式枚举（跨文件定义、扩展枚举 (Weekday || (Weekday = {})) ） 合并
var Color;
(function (Color) {
  Color[(Color['Red'] = 0)] = 'Red';
  Color[(Color['Blue'] = 1)] = 'Blue';
})(Color || (Color = {}));
(function (Color) {
  Color[(Color['DarkRed'] = 0)] = 'DarkRed';
  Color[(Color['DarkBlue'] = 1)] = 'DarkBlue';
})(Color || (Color = {}));
