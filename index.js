require("dotenv").config();
const debug = require("debug")("app:startup");
const express = require("express");
const app = express();

require('./startup/logging')()
require('./startup/validation')()
require('./startup/routes')(app, debug)
require('./startup/db')()
require('./startup/config')

// app.set("view engine", "pug");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Listening on port ${port}`);
});
