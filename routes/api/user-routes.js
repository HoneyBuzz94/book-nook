const router = require("express").Router();
const { User, Book } = require("../../models");

const passport = require("passport");
const initializePassport = require("../../passport-config");
initializePassport(
  passport,
  (username) => User.findOne({ where: { username: username } }),
  (id) => User.findByPk(id)
);

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model: Book,
          attributes: ["title"],
        },
      ],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/users/update-session",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/update-session", (req, res) => {
  req.session.save(() => {
    req.session.user_id = req.user.id;
    req.session.username = req.user.username;
    console.log(req.session.username);
    req.session.logged_in = true;
    console.log(req.session.logged_in);
    res.redirect("/");
  });
});

// Logout
router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
