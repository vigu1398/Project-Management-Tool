var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var story = new Schema({
    
    storyName: {
        type: String,
        required: true
    },

    taskIds: [
        {
            type: Schema.Types.ObjectId
        }
    ]
}); 

const stories = new mongoose.model('stories', story);

module.exports = stories;