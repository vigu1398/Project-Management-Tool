const { createProjectInsertObject, modifyProjectObject } = require('../../helper/project.helper');

const project = require('./project.model');
const company = require('../../models/company.model'); 

exports.createProject = async (request, response, next) => {
    try {

        var { companyId } = request.params;

        if(!request.headers.owner) {
            throw new Error("Owner ID is not present in headers");
        }

        if(!request.body || (Object.keys(request.body)).length == 0) {
            throw new Error("Request body is missing or is empty");
        }

        let companyRecord = await company.findOne({_id: companyId });
        if(!companyRecord) {
            throw new Error("Company Record not found");
        }

        let projectInsertBody = createProjectInsertObject(request.body, request.headers.owner);
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