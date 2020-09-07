const worker = new Worker('worker.js');
worker.postMessage('我是客户端~');
worker.onmessage = (e) => console.log('来自子进程的消息：' + e.data);
