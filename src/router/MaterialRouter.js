const express = require('express');
 const MaterialRouter = express.Router();

 const {getALL,CreateMat,getbyId,UpdateMAT,deleteMat}=require('../controller/MaterailController')

 MaterialRouter.get("/getall",getALL)
 MaterialRouter.get("/byId/:_id",getbyId)
 MaterialRouter.post("/addMaterial",CreateMat)
 MaterialRouter.put("/updateMaterial/:_id",UpdateMAT)
 MaterialRouter.delete("/deleteMaterial/:_id",deleteMat)

 module.exports=MaterialRouter