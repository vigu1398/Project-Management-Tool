const validator = require('validator');
 
exports.validateForm = (phone, email) => {
    if(!validator.isEmail(email)) {
        return new Error("Not a valid Email");
    }

    else if(!validator.isMobilePhone(phone)) {
        return new Error("Not a valid phone number");
    }
}