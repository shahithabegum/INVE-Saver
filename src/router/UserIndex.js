const express = require('express')
const INVE_Saver=express();
const ROUTE=require("./UserRouter")
INVE_Saver.use("/api",ROUTE);
module.exports=INVE_Saver;