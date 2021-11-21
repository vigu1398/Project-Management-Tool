const { createProjectInsertObject, modifyProjectObject } = require('../../helper/project.helper');
const _ = require('lodash');

const project = require('./project.model');
const company = require('../../models/company.model'); 

exports.createProject = async (request, response, next) => {
    try {
        var { companyId } = request.params;

        if(!request.body || (Object.keys(request.body)).length == 0) throw new Error("Request body is missing or is empty");

        let companyRecord = await company.findOne({_id: companyId });
        if(!companyRecord) throw new Error("Company Record not found");
        

        let projectInsertBody = createProjectInsertObject(request.body);
        let projectRecord = new project(projectInsertBody);

        await projectRecord.save();
        companyRecord.projectIds.push(projectRecord._id);

        await companyRecord.save();
    
        return response.status(200).json({ description: "New project created" , id: projectRecord._id });
    }

    catch(error) {
        return response.status(400).json({ error: error.message });
    }

}

exports.modifyProject = async (request, response, next) => {
    try {   

        var projectId = request.params.projectId;
        let projectRecord = await project.findOne({ _id: projectId });
        if(!projectRecord) {
            throw new Error("Project not found");
        }

        projectRecord = modifyProjectObject(request.body || {}, projectRecord);
        await projectRecord.save();

        return response.status(200).json({ description: "Modifed project successfully" });

    }

    catch(error) {
        return response.status(400).json({ error: error.message });
    }
}

exports.projectDetails = async (request, response, next) => {
    try {
        let { companyId, projectId } = request.params;
        let projectRecord = await project.findOne({ _id: projectId })
                                .populate({
                                    path: 'owner'
                                });
        if(!projectRecord) throw new Error("Project not found");
        response.status(200).json(projectRecord);
    }

    catch(error) {
        response.status(400).json({ error: error.message });
    }
}

exports.deleteProject = async (request, response, next) => {
    try {
        let { companyId, projectId } = request.params;
        let companyRecord = await company.findOne({ _id: companyId });
        let projectRecord = await project.findOne({ _id: projectId });

        if(!companyRecord) throw new Error("Company Record not found");
        if(!projectRecord) throw new Error("Project record not found");
        if(!companyRecord.projectIds.includes(projectId)) throw new Error("This company does not have this project")

        await project.deleteOne({ _id: projectId });
        companyRecord.projectIds = _.map((companyRecord.projectIds), (id) => { return id != projectId } );
        await companyRecord.save();

        return response.status(200).json({ description: "Deleted project" });
    }

    catch(error) {  
        console.log(error);
        return response.status(400).json({ error: error.message });
    }
}

// Get all projects of a company
exports.getAllProjects = async (request, response, next) => {
    try {
        var companyId = request.params.companyId;
        var companyRecord = await company.findOne({ _id: companyId })
                                .populate({
                                    path: 'projectIds',
                                    populate: {
                                        path: 'owner'
                                    }
                                });

        return response.status(200).json(companyRecord['projectIds']);
    }

    catch(error) {
        return response.status(400).json({ error: error.message });
    }
}

exports.getAllProjectMembers = async (request, response, next) => {
    try {
        let { companyId, projectId } = request.params;
        let projectRecord = await project.findOne({ _id: projectId })
                                .populate({
                                    path: 'userIds'
                                })
                                .lean();
        return response.status(200).json(projectRecord['userIds']);
    }
    catch(error) {
        return response.status(400).json({ error: error.message });
    }
}