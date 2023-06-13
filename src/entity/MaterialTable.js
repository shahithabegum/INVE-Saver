const mongoose = require('mongoose');

const MaterialTable =mongoose.model("materails",
new mongoose.Schema({
    materialname:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    createdby:{
        type:String,
        
    },
    updatedatedby:{
        type:String,
       
    },
    month:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    description:{
        type:String
    }
},
{ timestamps: true }))

exports.MaterialTable=MaterialTable;