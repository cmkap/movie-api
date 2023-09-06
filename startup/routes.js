const express = require('express')
const morgan = require("morgan");
const helmet = require("helmet");
const hompage = require("../routes/home");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const logger = require("../middleware/logger");

module.exports = function (app, debug) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    debug("Morgan enabled....");
  }

  app.use(logger);

  app.use(function (req, res, next) {
    console.log("...Authenticating");
    next();
  });
  app.use("/", hompage);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
