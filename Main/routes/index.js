// Import express router and apiRoute path
const router = require('express').Router();
const apiRoutes = require('./api');

// Tell express to use /api for apiRoutes
router.use('/api', apiRoutes);

// Export express router
module.exports = router;