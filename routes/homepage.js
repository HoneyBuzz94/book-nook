const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', { username: req.session.username });
})

module.exports = router;