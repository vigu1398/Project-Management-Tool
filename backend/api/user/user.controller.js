const users = require('./user.model');
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
    
        var existingUser = await user.findOne({email: email});
    
        if(existingUser) {
            return response.status(400).json({error: "A user with this email already exists"});
        }
    
        else {
            let createdUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone,
                created_date: new Date(),
                modified_date: new Date()
            };

            var newUser = new users(createdUser);
            await newUser.save();

            return response.status(200).json({description: "A new user has been created"});
    
        }   
    }

    catch(error) {
        return response.status(417).json({error: error.message});
    }
    
}
