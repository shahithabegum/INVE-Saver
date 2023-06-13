const User =require("../entity/User");

const getAllUsers = async (req,res)=>{
    const Users= await User.find();
    Users ? res.status(200).send({success:'true',errormessage:'false',result:Users}) :
    res.status(500).send({success:'flase',errormessage:'Network Error',result:[]})
}
const UpdateUser = async (req,res)=>{
    const updateduser = await User.findByIdAndUpdate(req.params._id,{username:req.body.username,
        email:req.body.email,
        phoneno:req.body.phoneno},{new:true})

    updateduser ?  res.status(200).send({success:'true',errormessage:'false',result:updateduser}) :
    res.status(500).send({success:'flase',errormessage:'User Could not updated',result:[]})
}
const deleteUser = async (req,res)=>{
    const deleted = await User.findByIdAndDelete(req.params._id)
    deleted ? res.status(200).send({success:'true',errormessage:'false',result:deleted}) :
    res.status(500).send({success:'flase',errormessage:'User Could not deleted',result:[]})
}
module.exports ={
    getAllUsers,
    UpdateUser,
    deleteUser
}