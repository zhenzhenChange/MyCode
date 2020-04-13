function foo(arg: number): number {
  return arg;
}

let num: number = 123;
const result = foo(num);
console.log(result);

let str: string = 'str';
let bool: boolean = true;

let ary: boolean[];

ary = [true];
ary.push(false);

let bry: object[] = [];
bry.push([]);

interface User {
  username: string;
  password: string;
}

let user: User;
user = {
  username: 'zhenzhen',
  password: '123456',
};

let My: {
  name: string;
  age: number;
};

My = {
  name: 'zhenzhen',
  age: 22,
};
