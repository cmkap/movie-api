const router = require('express').Router()
const asyncMiddleware = require('../middleware/async')

router.get("/", asyncMiddleware((req, res) => {
    res.render("index", { title: "My Movie App", message: "Welcome to my movie app!" });
  }));

module.exports = router