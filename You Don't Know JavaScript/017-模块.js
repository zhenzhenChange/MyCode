/*
 * ES6 之前
 * 1.基于一个带有内部变量和函数的外层函数
 * 2.返回一个可访问的公共 API 接口，带有对内部数据的闭包访问权
 */
function module(name) {
  function SayHello() {
    console.log('Hello: ', name);
  }

  return { SayHello };
}

const MyModule = module('zhenzhen');
MyModule.SayHello();
