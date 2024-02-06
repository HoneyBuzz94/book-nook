const router = require("express").Router();

router.get("/", (req, res) => {
  console.log(req.flash("error"));
  res.render("login", { message: req.flash("error") });
});

module.exports = router;
