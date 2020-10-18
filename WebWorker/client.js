const worker = new Worker('worker.js');
worker.postMessage('我是客户端~');
worker.onmessage = (e) => console.log('来自子进程的消息：' + e.data);

// 可不可以 import / File API 无法直接读取本地文件,只能加载网络文件