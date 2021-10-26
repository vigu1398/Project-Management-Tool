const { createCompanyInsertObject } = require('../../helper/company.helper');
const { validatePassword, hashPassword, verifyPassword } = require('../../util/password.util');
const { validateForm } = require('../../util/validator.util');

const user = require('./user.model');
const company = require('../../models/company.model');

exports.signUp = async (request, response, next) => {

    try {

        if(!request.body || (Object.keys(request.body)).length == 0) {
            return response.status(400).json({error: "Request Body is not found or is empty"});
        }
    
        var { firstName ,lastName, email, password, phone, role, companyName } = request.body;

    
        if(!email) {
            return response.status(400).json({error: "Email not present"});
        }

        // Email and Phone number validation
        const error = validateForm(phone, email);
        if(error) {
            throw error;
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
                role: role,
                created_date: new Date(),
                modified_date: new Date()
            };

            let createdCompany = {
                name: companyName
            }

            var newUser = new user(createdUser);
            var newCompany = new company(createdCompany);

            await newCompany.save();
            newUser.companyId = newCompany._id;
            await newUser.save();

            return response.status(200).json({description: "A new user has been created"});
    
        }   
    }

    catch(error) {
        if(newCompany && newCompany._id) {
            await company.deleteOne({ _id: newCompany._id });
        }
        return response.status(417).json({error: error.message});
    }
    
}

exports.signIn = async (request, response, next) => {

    try {

        if(!request.body || (Object.keys(request.body)).length == 0) {
            throw new Error("Request body is missing.");
        }
    
        var { email, password } = request.body;
        
        if(!email || !password) {
            throw new Error("Email or password is missing.");
        }
    
        // To check if the user already exists.
        var existingUser = await user.findOne({email: email});
        if(!existingUser) {
            throw new Error("A user is not present in this email address.");
        }


        // Check if the user has entered the correct password.
        var isValidPassword = await verifyPassword(password, existingUser.password);
        if(isValidPassword) {
            return response.status(200).json({ description: "Logged in successfully", companyId: existingUser.companyId });
        }
    
        else {
            throw new Error("Invalid password");
        }
    }

    catch(error) {
        return response.status(400).json({error: error.message});
    }    

} 

exports.modifyUser = async (request, response, next) => {

    try {

        if(!request.body) {
            throw new Error("Request body is missing for modify.");
        }
    
        var { email, password, firstName, lastName, phone } = request.body.userDetails;
        var { role } = request.body.companyDetails;
        
        if(!email) {
            throw new Error("Email is undefined for modify.");
        }

        const existingUser = await user.findOne({ email: email });
        if(!existingUser) {
            throw new Error("User with this email is not found");
        }

        //To actually modify the user.
        existingUser.email = email ? email : existingUser.email;
        existingUser.phone = phone ? phone : existingUser.phone;
        existingUser.firstName = firstName ? firstName : existingUser.firstName;
        existingUser.lastName = lastName ? lastName : existingUser.lastName;
        existingUser.password = password ? await hashPassword(password) : existingUser.password;
        existingUser.role = role ? role : (existingUser.role || "");

        if(request.body && request.body.companyDetails && request.body.companyDetails.name && !existingUser.companyId) {
            var companyInsertObject = createCompanyInsertObject(request.body.companyDetails);
            var companyRecord = new company(companyInsertObject);
            await companyRecord.save();

            var companyId = companyRecord._id;
            existingUser.companyId = companyId;
        } 

        await existingUser.save();

        return response.status(200).json({ description: "User modified successfully." });
    }

    catch(error) {
        return response.status(400).json({error: error.message});
    }

}

exports.getAllUsers = async (request, response, next) => {
    
    try {
        
        let { companyId } = request.params;
        let allUsers = await user.find({ companyId: companyId }, { firstName: 1, email: 1, _id: 0 });
        
        return response.status(200).json(allUsers);
    }

    catch(error) {
        return response.status(400).json({ error: error.message });
    }
}