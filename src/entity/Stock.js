const mongoose = require('mongoose');
const StockTable =mongoose.model("stock",
new mongoose.Schema({
    materialname:{
        type:String,
        required:true,
    },
   
    stock:{
        type:Number,
        required:true
    }
}));
exports.StockTable=StockTable;