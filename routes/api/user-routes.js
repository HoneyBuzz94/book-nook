// Import express router and models
const router = require("express").Router();
const { User, Book } = require("../../models");

// Import and use passport
const passport = require("passport");
const initializePassport = require("../../passport-config");
initializePassport(
  passport,
  (username) => User.findOne({ where: { username: username } }),
  (id) => User.findByPk(id)
);

// Get request for all user data. Request should be left blank.
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

// Post request for creating new user. Request should look like:
// {
//   "username": "newuser",
//   "email": "user@email.com",
//   "password": "12345678"
// }
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post request for logging in. Request should look like:
// {
// 	"username": "newuser",
// 	"password": "12345678"
// }
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    badRequestMessage: "",
  })
);

// Post request for logging user out. Request should be left blank.
router.post("/logout", async (req, res) => {
  // If the user's session status is set to logged_in, destroy the current session and return a status code
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, return a status code
    res.status(404).end();
  }
});

module.exports = router;
