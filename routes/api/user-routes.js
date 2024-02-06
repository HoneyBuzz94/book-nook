/* const router = require("express").Router();
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

router.get("/update-session", async (req, res) => {
  try{
    req.session.save(() => {
      req.session.user_id = req.user.id;
      req.session.username = req.user.username;
      console.log(req.session.username);
      req.session.logged_in = true;
      console.log(req.session.logged_in);
      res.redirect("/");
    });
  }catch(err){
    res.status(400).json(err);
  }
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

module.exports = router; */
const router = require("express").Router();
const { User, Book } = require("../../models");

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

router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    console.log(userData);

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
