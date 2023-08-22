const debug = require("debug")("app:startup");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

const logger = require('./middleware/logger')
const genres = require("./routes/genres");
const hompage = require("./routes/home")

app.set("view engine", "pug");

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

app.use('/', hompage)
app.use("/api/genres", genres);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
