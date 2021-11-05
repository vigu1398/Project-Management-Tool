var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var project = new Schema({
    
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    owner: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        requried: true
    },

    startDate: {
        type: Date,
        requried: true
    },

    privacy: {
        type: String,
        required: true
    },

    viewType: {
        type: String,
        required: true
    },

    endDate: {
        type: Date
    },

    taskIds: [{
        ref: 'tasks',
        type: Schema.Types.ObjectId
    }],

    userIds: [{
        ref: 'users',
        type: Schema.Types.ObjectId
    }]
}); 

const projects = new mongoose.model('projects', project);

module.exports = projects;