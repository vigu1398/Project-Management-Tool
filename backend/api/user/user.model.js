var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String
    },

    companyId: {
        type: Schema.Types.ObjectId
    },
    
    photo: {
        type: Buffer
    },

    role: {
        type: String
    },
    
    email: {
        type: String, 
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    created_date: {
        type: Date, 
        required: true
    },
    
    modified_date: {
        type: Date, 
        required: true
    },
    
    phone: {
        type: String,
        required: true
    }
}); 

const users = mongoose.model('users', user);

module.exports = users;