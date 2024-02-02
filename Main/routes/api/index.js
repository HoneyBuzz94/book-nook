// Import express router, user-routes, and book-routes path
const router = require('express').Router();
const userRoutes = require('./user-routes');
const bookRoutes = require('./book-routes');

// Tell express to use /users for the userRoutes and /books for the bookRoutes
router.use('/users', userRoutes);
router.use('/books', bookRoutes);

// Export express router
module.exports = router;