const router = require('express').Router();

const apiRoutes = require('./api');
const homepage = require('./homepage');
const journal = require('./journal');

router.use('/api', apiRoutes);
router.use('/', homepage);
router.use('/journal', journal);

module.exports = router;