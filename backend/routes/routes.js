var express = require('express');
const userRouter = require('../api/user');
var router = express.Router();

router.use('/api/user', userRouter);

module.exports = router;
