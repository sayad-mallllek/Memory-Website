const config = require("config");
const express = require("express");
const winston = require("winston");
// var bodyParser = require('body-parser')
const { PORT, dbURL: URL } = require("./config");
const app = express();

process.on("uncaughtException", (ex) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  console.log(ex.message);
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  console.log("WE GOT AN UNHANDLED REJECTION");
  console.log(ex.message);
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));


require('./startup/routes')(app);
require('./startup/db')();

if (!config.get("jwtPrivateKey")) {
  throw new Error("FATAL ERROR: JWT private key is not defined!")
}

app.listen(PORT, function () {
  console.log("Server is listening at port:" + PORT);
});