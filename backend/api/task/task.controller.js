const { modifyTaskObject } = require('../../helper/task.helper');
const project = require('../project/project.model');
const task = require('./task.model');

exports.addTask = async (request, response, next) => {
    try {
        let { projectId } = request.params;
        let projectRecord = await project.findOne({ _id: projectId });
        
        if(!projectRecord) throw new Error("Project not found");

        let taskRecord = new task(request.body);
        await taskRecord.save(); 
        await projectRecord.taskIds.push(taskRecord._id);
        await projectRecord.save();

        return response.status(200).json({ _id: taskRecord._id, description: "Task added successfully"});
    }

    catch(error) {
        return response.status(400).json({ error: error.message });
    }
}

exports.modifyTask = async(request, response, next) => {
    try {
        let { taskId } = request.params;
        let taskRecord = await task.findOne({ _id: taskId });
        if(!taskRecord) throw new Error("Task not found");

        taskRecord = modifyTaskObject(taskRecord, request.body);
        await taskRecord.save();

        return response.status(200).json({ description: "Task modified" });
    }

    catch(error) {
        return response.status(400).json({ error: error.message });
    }
}

exports.getAllTasks = async (request, response, next) => {
    try {
        let { projectId } = request.params;
        let projectRecord = await project.findOne({ _id: projectId })
                                .populate({
                                    path: 'taskIds'
                                });
        if(!projectRecord) throw new Error("Project not found");

        return response.status(200).json(projectRecord['taskIds']);
    }

    catch(error) {
        return response.status(400).json({ error: error.message });
    }
}