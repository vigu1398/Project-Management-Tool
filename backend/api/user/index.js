const express = require('express');
const userController = require('./user.controller');

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.put('/modify', userController.modifyUser);
userRouter.get('/:companyId/all', userController.getAllUsers);

module.exports = userRouter;