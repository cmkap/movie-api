const mongoose = require("mongoose");
const logger = require("../utils/logger");

module.exports = function () {
  const isTest = process.env.NODE_ENV === "test";

  const uri = isTest ? process.env.MONGO_TEST_URI : process.env.MONGO_DEV_URI;

  mongoose
    .connect(uri)
    .then(logger.log({ level: "info", message: `Connected to ${uri}...` }));
};
