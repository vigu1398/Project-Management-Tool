var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var task = new Schema({
    
    title: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        requried: true
    },

    summary: {
        type: String
    },

    endDate: {
        type: Date
    },

    assignee:{
        ref: 'users',
        type: Schema.Types.ObjectId,
        requried: true
    },

    priority: {
        type: String,
        enum: ["Low", "Normal", "High", "Critical"]
    },

    status: {
        type: String,
        enum: ["Open", "InProgress", "Ready", "Testing", "Closed"]
    },
    
    color: {
        type: String
    },

    tags: {
        type: String
    },

    className: {
        type: String
    },

    bugIds: [{
        type: Schema.Types.ObjectId
    }]

}); 

const tasks = new mongoose.model('tasks', task);

module.exports = tasks;