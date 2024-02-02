// Import express router and models
const router = require("express").Router();
const { User, Book } = require("../../models");

// Get request for all user data. Request should be left blank.
router.get("/", async (req, res) => {
  try {
    // Find all users and assign their data to the const userData. Include associated data from the book model (only the titles)
    const userData = await User.findAll({
      include: [
        {
          model: Book,
          attributes: ["title"],
        },
      ],
    });
    // Return status code to the user
    res.status(200).json(userData);
  } catch (err) {
    // Return status code to the user
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
    // Take the user input and create a new user in the database
    const userData = await User.create(req.body);
    // Save the user data to the session and set their status as logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    // Return status code to the user
    res.status(400).json(err);
  }
});

// Post request for logging in. Request should look like:
// {
// 	"username": "newuser",
// 	"password": "12345678"
// }
router.post("/login", async (req, res) => {
  try {
    // Find user in the database using their username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    // If user is not found, return status code with json message
    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }
    // Compare the user password with the user in the database
    const validPassword = await userData.checkPassword(req.body.password);
    // If password does not match, return status code with json message
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }
    // Save the user data to the session and set their status as logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ message: `Welcome ${userData.username}` });
    });
  } catch (err) {
    // Return status code to the user
    res.status(400).json(err);
  }
});

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

// Export express router
module.exports = router;