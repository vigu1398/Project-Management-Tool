var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var company = new Schema({
    
    name: {
        type: String
    },

    projectIds: [
        {
            ref: 'projects',
            type: Schema.Types.ObjectId
        }
    ]
}); 

const companies = new mongoose.model('companies', company);

module.exports = companies;

