const router = require("express").Router();
const { User, Book } = require("../../models");

// Get all books
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new book post
router.post("/", async (req, res) => {
  try {
    const bookData = await Book.create(req.body);
    res.redirect("/");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;