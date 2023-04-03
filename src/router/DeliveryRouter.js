const express = require('express');
 const DeliveryRouter = express.Router();

 const {getALL,CreateDel,getbyId,UpdateDEL,deleteDel}=require('../controller/DeliveryController')

 DeliveryRouter.get("/del",getALL)
 DeliveryRouter.get("/delbyId/:_id",getbyId)
 DeliveryRouter.post("/addDeliveryReports",CreateDel)
 DeliveryRouter.put("/updateDeliveryReports/:_id",UpdateDEL)
 DeliveryRouter.delete("/deleteDeliveryReports/:_id",deleteDel)

 module.exports=DeliveryRouter