const mongoose = require('mongoose');

const DeliverTable =mongoose.model("Delivery",
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
    vasselname:{
        type:String,
        required:true,
    },
    description:{
        type:String
    }
},{ timestamps: true }))

exports.DeliverTable=DeliverTable;