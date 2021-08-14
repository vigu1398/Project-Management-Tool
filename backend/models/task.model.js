var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var task = new Schema({
    
    taskName: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        requried: true
    },

    endDate: {
        type: Date
    },

    assignedTo: [
        {
            type: Schema.Types.ObjectId
        }
    ],

    watchers: [
        {
            type: Schema.Types.ObjectId
        }
    ],

    priority: {
        type: String
    },

    status: {
        type: String,
        enum: ["New", "In Progress", "Ready for test", "Closed"]
    },

    bugIds: [
        {
            type: Schema.Types.ObjectId
        }
    ]

}); 

const tasks = new mongoose.model('tasks', task);

module.exports = tasks;