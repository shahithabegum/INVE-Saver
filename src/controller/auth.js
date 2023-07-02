const User = require('../entity/User')
const {hashGenerator,validator}=require("../utilities/Passwordbcrypt")
const jwt = require('jsonwebtoken')
const randomstring =require('randomstring')
const nodemailer = require('nodemailer')
require('dotenv').config();
const registration = async (req,res)=>{
    const user= await User.findOne({email:req.body.email})
    if(!user){
        const hashpass = await hashGenerator(req.body.password)
        let newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashpass,
            employeeid:req.body.employeeid,
            phoneno:req.body.phoneno,
            role:req.body.role
        })
        await newUser.save();
        newUser ?   res.status(201).send({success:'true',errormessage:'false',result:newUser}) :
        res.status(201).send({success:'false',errormessage:'error occured',result:[]})
    }
    else{
        res.status(201).send({success:'false',errormessage:'Email Id already Exist',result:[]})
    }

}

const login = async (req,res)=>{
 
    const user= await User.findOne({email:req.body.email})
     //creating jwt token for user
    //  const token=jwt.sign({_id:user.id},process.env.TOKEN_SECRET)
    //  res.header("Bearer-token",token).send(token)
    const token = jwt.sign({ ...user.toJSON() },process.env.TOKEN_SECRET, { expiresIn: '7d' });
    //     res.send(
    //         token
    //    )
    if(!user) {res.status(400).send({success:"false",errormessage:'user dose not exit',result:[]})}
    else{
       const check= await validator(req.body.password,user.password)
     check ?
        res.status(201).send({success:'true',errormessage:'false',result:{user,token:token}})
       :
       res.status(400).send({success:"false",errormessage:'Passwor Incorrect',result:[]})
       
    }
   
   
}
const changePassword = async (req,res)=>{
  const user= await User.findOne({email:req.body.email})
    if(user) {
        const check= await validator(req.body.oldpassword,user.password)
        if(check)
        { 
            const hashpass = await hashGenerator(req.body.password)
           const chnagedPassword = await User.findOneAndUpdate({email:req.body.email},{password:hashpass})
           chnagedPassword ? res.status(200).send({success:"true",errormessage:'false',result:chnagedPassword}):
           res.status(400).send({success:"false",errormessage:'Passwor Incorrect',result:[]})
         }
          else{ 
           res.status(400).send({success:"false",errormessage:'oldPasswor Incorrect',result:[]})
          }
    }
    else{
      
       res.status(400).send({success:"false",errormessage:'user doesnot exist',result:[]})
       
    }
   
    }
   const sendMail = async (name,email,token)=>{
    console.log("user",process.env.Email_User)
    console.log("pass",process.env.Email_password)
     const transpoter =  nodemailer.createTransport({
            host:'smtp.ethereal.email',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.Email_User,
                pass:process.env.Email_password
            }
        })
     const mailoption = {
        from:process.env.Email_User,
        to:email,
        subject:"Reset Password",
        html:'<p> Hello '+name+',please clik this Link  to  </p><a href="http://localhost:8080/api/resetpassword?token='+token+'">  Reset your Password </a>'
       
     }
     transpoter.sendMail(mailoption,(err,info)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(info.response)
        }
     })
   } 
    const forgetPassword = async (req,res)=>{
         const UserData = await User.findOne({email:req.body.email})
         if(UserData){
                const RandomString = randomstring.generate();
             const user=  await User.updateOne({email:req.body.email},{$set:{token:RandomString}},{new:true})
             sendMail(UserData.username,UserData.email,RandomString)
             res.status(200).send({success:"true",message:'please check your email',result:user})
         }
         else{
            res.status(400).send({success:"false",errormessage:'user doesnot exist',result:[]})
         }
    }
    const resetPassword = async (req,res)=>{
          const token = req.query.token;
          const tokendata= await User.findOne({token:token})
          if(tokendata){
            const password =req.body.password;
            const hashpass = await hashGenerator(password)
            const newpassword = await User.findByIdAndUpdate({_id:tokendata._id},{$set:{password:hashpass,token:''}},{new:true})
           res.status(200).send({success:"true",message:'password Reseted successfully',result:newpassword})
       
        }
          else{
            res.status(400).send({success:"false",errormessage:'this link has been expried...!',result:[]})
          }
    }
module.exports={
    registration,
    login,
    changePassword,
    forgetPassword,
    resetPassword
}