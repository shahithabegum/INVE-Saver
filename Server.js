require('dotenv').config();
const inve_saver=require('./index')

const PORT=process.env.port||8081
inve_saver.listen(PORT,()=>{console.log(`server Runing in ${PORT}`)})