const express = require('express');
const StockRouter =express.Router();

const {getALL}=require("../controller/StockController");

StockRouter.get('/getStock',getALL)

module.exports=StockRouter;