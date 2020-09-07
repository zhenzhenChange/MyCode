let i = 0;

setInterval(() => {
  postMessage('Oh' + i++);
}, 1000);

onmessage = (msg) => console.log(msg);
