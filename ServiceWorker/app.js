const result = navigator.serviceWorker.register("./sw.js", { scope: "./" });
result.then(res => console.log(res)).catch(err => console.log(err));
