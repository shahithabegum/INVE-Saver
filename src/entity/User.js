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
    phoneno:{
        type:String,
        required:true,
    },
    employeeid:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    oldpassword:{
        type:String,
    },
    password:{
        type:String,
        required:true
       
    },
    token:{
        type:String,
        default:""
    }
},
{timestamps:true}
))

module.exports=User;