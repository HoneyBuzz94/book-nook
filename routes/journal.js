const timestamp = require('time-stamp');
const router = require("express").Router();

router.get("/", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render('journal', { userId: req.session.user_id, timeStamp: timestamp('MM/DD/YYYY') });
});

module.exports = router;