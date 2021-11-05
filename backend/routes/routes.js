const express = require('express');
const projectRouter = require('../api/project');
const userRouter = require('../api/user');
const taskRouter = require('../api/task'); 

var router = express.Router();

router.use('/api/user', userRouter);
router.use('/api/project', projectRouter);
router.use('/api/project', taskRouter);

module.exports = router;
