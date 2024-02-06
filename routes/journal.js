const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('journal', { userId: req.session.user_id});
})

module.exports = router;