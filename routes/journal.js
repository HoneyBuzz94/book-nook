const timestamp = require('time-stamp');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('journal', { userId: req.session.user_id, timeStamp: timestamp('MM/DD/YYYY') });
})

module.exports = router;