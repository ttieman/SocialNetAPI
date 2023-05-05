const router = require('express').Router();

const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.use((req, res) => {  // if a request is made to an endpoint that doesn't exist, send a 404 error
    res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;  // export the router