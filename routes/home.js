const router = require('express').Router()

router.get("/", (req, res) => {
    res.render("index", { title: "My Movie App", message: "Welcome to my movie app!" });
  });

module.exports = router