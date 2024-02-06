const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', { username: req.session.username, loggedIn: req.session.logged_in });
})

module.exports = router;