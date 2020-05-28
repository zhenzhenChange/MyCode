const fs = require('fs');
const superagent = require('superagent');

const getCookie = (stuno, username) => {
  return new Promise((resolve, reject) => {
    superagent
      .post('http://ds.nnxy.cn/exam/login')
      .type('form')
      .send({ stuno, c2: 'on', username, button: '提交' })
      .end(function (err, res) {
        if (err) reject(err);

        resolve(res.header['set-cookie'][0].split(';')[0]);
      });
  });
};

const getQuestion = (cookie) => {
  return new Promise((resolve, reject) => {
    superagent
      .get('http://ds.nnxy.cn/exam/create')
      .set('Cookie', cookie)
      .end(function (err, res) {
        if (err) reject(err);

        resolve();
      });
  });
};

const postAnswer = (cookie) => {
  return new Promise((resolve, reject) => {
    superagent
      .post('http://ds.nnxy.cn/exam/score')
      .set('Cookie', cookie)
      .type('data')
      .send({ state: 1, ans: JSON.stringify(new Array(40).fill('')) })
      .end((err, res) => {
        if (err) reject(err);

        resolve();
      });
  });
};

const getAnswer = (cookie) => {
  return new Promise((resolve, reject) => {
    superagent
      .get('http://ds.nnxy.cn/exam/errque')
      .set('Cookie', cookie)
      .end((err, res) => {
        if (err) reject(err);

        if (res.body.data) {
          const filter = JSON.parse(res.body.data).map((answer) => {
            delete answer.no;
            delete answer.ans1;
            return answer;
          });

          resolve(filter);
        } else {
          resolve([{ que: '222222', anst: 'CC', ans: [111111111111] }]);
        }
      });
  });
};

getCookie('B142017070030401', '韦克好').then((cookie) => {
  getQuestion(cookie).then(() => {
    postAnswer(cookie).then(() => {
      getAnswer(cookie).then((filter) => {
        fs.readFile('./data.json', 'utf8', (err, data) => {
          if (err) console.log(err);

          const format = JSON.stringify(JSON.parse(data).concat([], filter), null, 2);

          fs.writeFileSync('./data.json', format, 'utf8', (err) => console.log(err));
        });
      });
    });
  });
});
