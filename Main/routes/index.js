// Import express router and apiRoute path
const router = require('express').Router();
const apiRoutes = require('./api');
const homePage = require('./homepage');

// Tell express to use /api for apiRoutes
router.use('/api', apiRoutes);
router.use('/', homePage);

// Export express router
module.exports = router;