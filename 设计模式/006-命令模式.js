/*
 * 命令模式：向某些对象发送请求，不关心请求的接收者，也不关心被请求的相关操作。
 * 命令：指一个执行某些特定事情的指令。
 * 撤销：执行命令的反向操作。（下棋悔棋）
 * 重做：执行不可撤销的命令。（录像回放）
 * 命令队列：当一个命令执行完成后，再执行下一个命令。
 * 宏命令：一组命令的集合，一次执行一批命令（即迭代命令集合，依次执行）。
 * 傻瓜命令：将请求转交给接收者，由接收者执行命令。
 * 智能命令：不需要接收者，直接执行请求的命令。
 */
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

// 1.给目标对象设置命令（单击时，执行命令）
const setCommand = (target, command) => void (target.onclick = () => void command.execute());

// 2.接收指令，返回对象（包含指令的执行方法）
const RefreshCommand = (receiver) => ({ execute: () => void receiver.refresh() });

// 3.指令设置
const MenuBar = { refresh: () => void console.log('刷新菜单！') };

// 4.封装指令
const btn1Command = RefreshCommand(MenuBar);

setCommand(btn1, btn1Command);

btn1.getBoundingClientRect();
