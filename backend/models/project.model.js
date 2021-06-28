var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var project = new Schema({
    
    projectName: {
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

    storyIds: [
        {
            type: Schema.Types.ObjectId
        }
    ],

    userIds: [
        {
            type: Schema.Types.ObjectId
        }
    ]
}); 

const projects = new mongoose.model('projects', project);

module.exports = projects;