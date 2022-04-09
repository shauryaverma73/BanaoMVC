const express = require('express');
const userRouter = express.Router();
const authController = require('./controllers/authController');

// registration endpoint
userRouter.post('/register', authController.register);

// login endpoint
userRouter.post('/login', authController.login);

// forget password endpoint
userRouter.post('/forgetPassword', authController.forgetPassword);

// resetpassword endpoint
userRouter.post('/resetPassword/:token', authController.resetPassword);

module.exports = userRouter;