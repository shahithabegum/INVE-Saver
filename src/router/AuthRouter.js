const express =require('express')
const {registration,login,changePassword,forgetPassword,resetPassword}=require('../controller/auth')
 const AuthRouter = express.Router();

 AuthRouter.post('/register',registration)
 AuthRouter.post('/login',login)
 AuthRouter.patch('/changepassword',changePassword)
 AuthRouter.post('/forgetpassword',forgetPassword)
 AuthRouter.post('/resetpassword',resetPassword)
 module.exports =AuthRouter;