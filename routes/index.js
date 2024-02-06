// Import express router and apiRoute path
const router = require('express').Router();
const apiRoutes = require('./api');
const homePage = require('./homepage');
const login = require('./login');
const journal = require('./journal');

// Tell express to use /api for apiRoutes
router.use('/api', apiRoutes);
router.use('/', homePage);
router.use('/login', login);
router.use('/journal', journal);

// Export express router
module.exports = router;