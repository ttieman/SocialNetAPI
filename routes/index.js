const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {  // if a request is made to an endpoint that doesn't exist, send a 404 error
    res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;  // export the router