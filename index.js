const express =require('express')
const mongoose=require('mongoose');
const bodyparser=require('body-parser');

require('dotenv').config();

const INVE_Saver=express();
INVE_Saver.use(bodyparser.json());

console.log("hai shaju im fine")
const router=require('./src/router/MaterailIndex')
INVE_Saver.use(router);
const DelRoute=require('./src/router/DelIndex')
INVE_Saver.use(DelRoute)
//DBConnention
mongoose.connect(process.env.mongoDB_URL).then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });
module.exports = INVE_Saver;