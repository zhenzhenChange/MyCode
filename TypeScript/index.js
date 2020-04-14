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
    password: '123456'
};
// 内联类型注解
var My;
My = {
    name: 'zhenzhen',
    age: 22
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
    if (Array.isArray(str))
        s = str.join('');
    else
        s = str.trim();
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
var memberStr = member[0], memberNum = member[1], memberObj = member[2];
console.log(memberStr, memberNum, memberObj);
