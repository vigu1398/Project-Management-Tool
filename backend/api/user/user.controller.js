const { validatePassword, hashPassword } = require('../../util/password.util');
const user = require('./user.model');

exports.signUp = async (request, response, next) => {

    try {

        if(!request.body || (Object.keys(request.body)).length == 0) {
            return response.status(400).json({error: "Request Body is not found or is empty"});
        }
    
        var { firstName ,lastName, email, password, phone } = request.body;

    
        if(!email) {
            return response.status(400).json({error: "Email not present"});
        }

        // Password Validation.
        var passwordViolations = validatePassword(password);
        if(passwordViolations.length) {
            return response.status(400).json({error: "Password too weak", violations: passwordViolations});
        }

        // To check if the user already exists.
        var existingUser = await user.findOne({email: email});
        if(existingUser) {
            return response.status(400).json({error: "A user with this email already exists"});
        }
    
        else {
            
            var hash = await hashPassword(password);

            let createdUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                phone: phone,
                created_date: new Date(),
                modified_date: new Date()
            };

            var newUser = new user(createdUser);
            await newUser.save();

            return response.status(200).json({description: "A new user has been created"});
    
        }   
    }

    catch(error) {
        return response.status(417).json({error: error.message});
    }
    
}
