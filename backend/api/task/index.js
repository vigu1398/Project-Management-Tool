const taskRouter = require('express').Router();
const taskController = require('./task.controller');

taskRouter.post('/:projectId/task/add', taskController.addTask);
taskRouter.put('/:projectId/task/:taskId/modify', taskController.modifyTask);
taskRouter.get('/:projectId/task/all', taskController.getAllTasks);

module.exports = taskRouter