/* 分时函数 */

// 一次执行
function renderFriends(data) {
  for (let i = 0; i < data; i++) {
    const div = document.createElement('div');
    div.innerHTML = i;
    document.body.appendChild(div);
  }
}

renderFriends(1000);

// 分批进行
function chunk(data, fn, count) {
  let timer = null;

  function start() {
    for (let i = 0; i < Math.min(count || 1, data.length); i++) fn(data.shift());
  }

  return () => {
    timer = setInterval(() => {
      if (data.length == 0) return clearInterval(timer);

      start();
    }, 200);
  };
}

const ary = [];
for (let i = 0; i < 1000; i++) ary.push(i);

const renderFriends = chunk(
  ary,
  (n) => {
    const div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
  },
  10,
);

renderFriends();
