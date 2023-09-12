const mongoose = require("mongoose");
const logger = require('../utils/logger')

module.exports = function () {
  const username = process.env.USERNAME;
  const password = process.env.SECRET_KEY;

  const uri = `mongodb+srv://${username}:${password}@cluster0.xe4jeek.mongodb.net/movie?retryWrites=true&w=majority`;

  mongoose
    .connect(uri)
    .then(logger.log({ level: "info", message: "Connected to MongoDB" }));
};
