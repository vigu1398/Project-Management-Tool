const express = require('express');
const projectRouter = express.Router();

const projectController = require('./project.controller');

projectRouter.post('/:companyId/create', projectController.createProject);

module.exports = projectRouter;