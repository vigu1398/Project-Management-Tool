var express = require('express');
const projectRouter = require('../api/project');
const userRouter = require('../api/user');
var router = express.Router();

router.use('/api/user', userRouter);
router.use('/api/project', projectRouter);

module.exports = router;
