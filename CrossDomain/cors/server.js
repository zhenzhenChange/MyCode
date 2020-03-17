const express = require("express");
const app = express();

app.use((req, res, next) => {
  // 允许请求的源
  res.setHeader("Access-Control-Allow-Origin", ["http://localhost:3333"]);
  // 允许请求的方法
  res.setHeader("Access-Control-Allow-Methods", ["PUT", "DELETE"]);
  // 允许携带的请求头
  res.setHeader("Access-Control-Allow-Headers", ["name"]);
  // 允许携带Cookie
  res.setHeader("Access-Control-Allow-Credentials", true);
  // 允许访问的请求头
  res.setHeader("Access-Control-Allow-Expose-Headers", ["name"]);
  next();
});

app.get("/jsonp", (req, res) => {
  const { msg, cb } = req.query;
  console.log(msg);
  console.log(cb);
  res.end(`${cb}({msg:'Yes'})`);
});

app.listen(3344);
