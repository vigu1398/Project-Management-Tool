const express = require('express');
const userController = require('./user.controller');

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);

module.exports = userRouter;