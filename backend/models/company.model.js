var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var company = new Schema({
    
    companyName: {
        type: String
    },

    projectIds: [
        {
            type: Schema.Types.ObjectId
        }
    ]
}); 

const companies = new mongoose.model('companies', company);

module.exports = companies;

