const User = require('../entity/User')

const {hashGenerator,validator}=require("../utilities/Passwordbcrypt")

const registration = async (req,res)=>{
    const hashpass = await hashGenerator(req.body.password)
    let newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashpass
    })
    await newUser.save();
    newUser ?   res.status(201).send({success:'true',errormessage:'false',result:newUser}) :
    res.status(201).send({success:'false',errormessage:'error occured',result:[]})

}

const login = async (req,res)=>{
    const user= await User.findOne({email:req.body.email})
    if(!user) {res.status(400).send({success:"false",errormessage:'user dose not exit',result:[]})}
    else{
       const check= await validator(req.body.password,user.password)
     check ?
        res.status(201).send({success:'true',errormessage:'false',result:user})
       :
       res.status(400).send({success:"false",errormessage:'Passwor Incorrect',result:[]})
       
    }
   
}
module.exports={
    registration,
    login
}