const mongoose=require('mongoose')

const User =mongoose.model("user",
new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
       
    },
    // profilePic:{
    //     type:String,
    //     default:""
    // }
}
))

module.exports=User;