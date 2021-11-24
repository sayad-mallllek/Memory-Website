const mongoose = require("mongoose");
const winston = require("winston");
const { dbURL: URL } = require("../config");
module.exports = function () {
  mongoose.connect(URL).then(() => {
    console.log("Connected...");
    winston.info("Connected...");
  });
};
