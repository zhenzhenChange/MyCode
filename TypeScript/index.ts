// 基本类型注解
let num: number = 123;
let str: string = 'str';
let bool: boolean = true;

function foo(arg: number): number {
  return arg;
}

const result = foo(num);
console.log(result);

// 数组注解
let bry: object[] = [];
bry.push([]);

// 接口注解
interface User {
  username: string;
  password: string;
}
let user: User;
user = {
  username: 'zhenzhen',
  password: '123456',
};

// 内联类型注解
let My: {
  name: string;
  age: number;
};
My = {
  name: 'zhenzhen',
  age: 22,
};

// 特殊类型 any null undefined void
let any: any;
any = '1';
any = 1;
any = null;
any = undefined;
num = any;
bool = any;

function aaa(num: number): void {
  void num;
}

// 泛型
function reverse<T>(ary: T[]): T[] {
  const result: T[] = [];

  for (let i = ary.length - 1; i >= 0; i--) {
    result.push(ary[i]);
  }

  return result;
}

const ary: number[] = [1, 2, 3];
const strAry: string[] = ['1', '2', '3'];

let results = reverse(ary);
let resultStr = reverse(strAry);

console.log(results);
console.log(resultStr);

results[0] = 1;
resultStr[0] = '1';

// 联合类型注解
function formatString(str: string[] | string): string {
  let s: string = '';

  if (Array.isArray(str)) s = str.join('');
  else s = str.trim();

  return s;
}

const forStr: string = 'aa';
const forStrAry: string[] = ['aaa   ', 'bb', 'cc'];

const forResult = formatString(forStr);
console.log(forResult);

// 交叉类型
function extend<T, U>(param: T, arg: U): T & U {
  const result = <T & U>{};

  for (const key in param) {
    (<T>result)[key] = param[key];
  }

  for (const key in arg) {
    if (!result[key]) {
      (<U>result)[key] = arg[key];
    }
  }

  return result;
}

const resultExtend = extend({ name: 'zhenzhen' }, { name: 'xiaozhenzhen', age: 22 });
console.log(resultExtend);

// 元组
let member: [string, number, object];
member = ['1', 2, {}];

let [memberStr, memberNum, memberObj] = member; // 解构
console.log(memberStr, memberNum, memberObj);

// 类型别名
type StrOrNum = string | number | boolean | { val: number };
type cb = (data: object) => void;

let typeAlias: StrOrNum;
typeAlias = '123';
typeAlias = 123;
typeAlias = true;
typeAlias = { val: 123 };

// 类型断言
let Foo: number = 123;
let Bar: string = '123';
Bar = Foo as any;

function Baz(): any {
  return 123;
}
Bar = Baz() /*  as any */;
