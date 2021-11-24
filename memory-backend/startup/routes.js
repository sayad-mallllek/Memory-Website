const express = require("express");
var cors = require("cors");
const posts = require("../routes/posts");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({
  // 	extended: true
  //   }));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
  app.use(cors());
  app.use(express.json());

  app.use("/api/posts", posts);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
