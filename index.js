require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("./utils/logger");

require("./startup/logging")();
require("./startup/validation")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

// app.set("view engine", "pug");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

module.exports = server;
