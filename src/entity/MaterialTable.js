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
}))

exports.MaterialTable=MaterialTable;