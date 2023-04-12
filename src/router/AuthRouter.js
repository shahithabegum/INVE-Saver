const express =require('express')
const {registration,login}=require('../controller/auth')
 const AuthRouter = express.Router();

 AuthRouter.post('/register',registration)
 AuthRouter.post('/login',login)

 module.exports =AuthRouter;