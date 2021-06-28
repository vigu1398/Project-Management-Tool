const express = require('express');
const userRouter = express.Router();

userRouter.post('/signup', (request, response, next) => {
    console.log("Signup");
    return response.status(200).json({description: "Signup"});
})

module.exports = userRouter;