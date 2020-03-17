const express = require("./node_modules/express");
const app = express();

app.get("/jsonp", (req, res) => {
  const { msg, cb } = req.query;
  console.log(msg);
  console.log(cb);
  res.end(`${cb}({msg:'Yes'})`);
});

app.listen(3344);
