const passwordValidator = require('password-validator');
const argon2 = require('argon2');
const bpcrypt = require('bcrypt');

exports.validatePassword = (password) => {
    
    var schema = new passwordValidator();

    // Add properties to it
    schema
    .is().min(8)                                    // Minimum length 8.
    .is().max(30)                                   // Maximum length 30.
    .has().uppercase()                              // Must have uppercase letters.
    .has().lowercase()                              // Must have lowercase letters.
    .has().digits(2)                                // Must have at least 1 digit.
    .has().not().spaces()                           // Should not have spaces.
    .has().symbols(1)                               // Should have atleast one special charectar. 

    return schema.validate(password, {list: true}); // {list: true} returns all the rules that were failed.
}

exports.hashPassword = async (password) => {
    try {
        var hash = await bpcrypt.hash(password, 10);
        return hash;
    }
    catch(error) {
        return error;
    }
}


 

 
