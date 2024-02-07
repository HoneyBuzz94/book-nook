const router = require("express").Router();
const { User, Book } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const bookData = await Book.findAll({
      where: { user_id: req.session.user_id },
      order: [['title', 'ASC']],
    });

    const books = bookData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      books,
      username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
