const express = require('express');
const projectRouter = express.Router();

const projectController = require('./project.controller');

projectRouter.post('/:companyId/create', projectController.createProject);
projectRouter.put('/:projectId/modify', projectController.modifyProject);
projectRouter.get('/:companyId/projects', projectController.getAllProjects);
projectRouter.get('/:companyId/:projectId', projectController.projectDetails);
projectRouter.delete('/:companyId/:projectId', projectController.deleteProject);
projectRouter.get('/:companyId/:projectId/users', projectController.getAllProjectMembers);

module.exports = projectRouter;