var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var task = new Schema({
    
    bugName: {
        type: String,
        required: true
    },

    description: {
        type: Date,
        requried: true
    },

    priority: {
        type: Date
    },

    priority: {
        type: String
    }

}); 

const bugs = new mongoose.model('bugs', bug);

module.exports = bugs;