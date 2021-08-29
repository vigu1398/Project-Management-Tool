const express = require('express');
const projectRouter = express.Router();

const projectController = require('./project.controller');

projectRouter.post('/:companyId/create', projectController.createProject);
projectRouter.put('/:projectId/modify', projectController.modifyProject);

module.exports = projectRouter;