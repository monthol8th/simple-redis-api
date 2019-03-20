var express = require("express");
var app = express();
var Redis = require("ioredis");
var redis = new Redis();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  redis.get("data", function(err, result) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const data = { number: parseInt(result) || 0 };
      console.log(data);
      res.json(data);
    }
  });
});

app.post("/", function(req, res) {
  console.log(req.body);
  redis.set("data", req.body.number || 0);
  res.json(req.body);
});

app.post("/increase", function(req, res) {
  redis.get("data", function(err, result) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const number = (parseInt(result) || 0) + 1;
      const data = { number };
      console.log(data);
      redis.set("data", number);
      res.json(data);
    }
  });
});

app.post("/decrease", function(req, res) {
  redis.get("data", function(err, result) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const number = (parseInt(result) || 0) - 1;
      const data = { number };
      console.log(data);
      redis.set("data", number);
      res.json(data);
    }
  });
});

app.listen(8000, function() {
  console.log("listen on port 8000");
});
