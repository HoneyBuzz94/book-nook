// Import express router and apiRoute path
const router = require('express').Router();
const apiRoutes = require('./api');
const homePage = require('./homepage');
const login = require('./login');

// Tell express to use /api for apiRoutes
router.use('/api', apiRoutes);
router.use('/', homePage);
router.use('/login', login);
// Export express router
module.exports = router;