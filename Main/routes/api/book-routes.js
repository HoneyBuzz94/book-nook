// Import express and routes to User and Book models
const router = require("express").Router();
const { User, Book } = require("../../models");

// Get request for all book data. Request should be left blank.
router.get("/", async (req, res) => {
  try {
    // Find all books and assign their data to the const bookData. Include associated data from the User model (only include the username).
    const bookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // Return status code to the user
    res.status(200).json(bookData);
  } catch (err) {
    // Return status code to the user
    res.status(500).json(err);
  }
});

// Post request for creating a new book. Request should look like:
// {
// 	"title": "New Book",
// 	"author": "Jane Doe",
// 	"review": "Here's my review of the book...",
// 	"user_id": <user_id>
// }
router.post("/", async (req, res) => {
  try {
    // Take the user input and create a new book in the database
    const bookData = await Book.create(req.body);
    // Return status code to the user
    res.status(200).json(bookData);
  } catch (err) {
    // Return status code to the user
    res.status(400).json(err);
  }
});

// Export express router
module.exports = router;