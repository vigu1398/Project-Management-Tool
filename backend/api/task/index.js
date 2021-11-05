const taskRouter = require('express').Router();
const taskController = require('./task.controller');

taskRouter.post('/:projectId/task/add', taskController.addTask);

module.exports = taskRouter