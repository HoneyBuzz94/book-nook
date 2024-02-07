/* const router = require("express").Router();

router.get("/", (req, res) => {
  console.log(req.flash("error"));
  res.render("login", { message: req.flash("error") });
});

module.exports = router; */
const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;