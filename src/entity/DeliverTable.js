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
}))

exports.DeliverTable=DeliverTable;