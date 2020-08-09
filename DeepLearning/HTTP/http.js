const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.static('public'));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/index.html', function (request, response) {
  fs.readFile('./' + request.path.substr(1), function (err, data) {
    if (err) {
      console.log(err);
      response.writeHead(404, { 'Content-Type': 'text/html' });
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data.toString());
    }
    response.end();
  });
});

app.listen(3000, function () {
  console.log('server start');
});
