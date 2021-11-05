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