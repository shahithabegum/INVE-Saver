const express =require('express')
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors = require('cors')
require('dotenv').config();

const INVE_Saver=express();
INVE_Saver.use(bodyparser.json());
INVE_Saver.use(cors())
console.log("hai shaju im fine")

const router=require('./src/router/MaterailIndex')
INVE_Saver.use(router);
const DelRoute=require('./src/router/DelIndex')
INVE_Saver.use(DelRoute)
const Stock=require("./src/router/StockIndex")
INVE_Saver.use(Stock)
const authuser=require("./src/router/AuthIndex")
INVE_Saver.use(authuser)
const userRouter =require("./src/router/UserIndex")
INVE_Saver.use(userRouter)
//DBConnention
mongoose.connect(process.env.mongoDB_URL).then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });
module.exports = INVE_Saver;