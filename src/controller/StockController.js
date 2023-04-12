const {StockTable}=require('../entity/Stock')
const getALL = async (req,res)=>{
    let StockData= await StockTable.find();
    if(!StockData) return res.status(200).send({success:'false',errormessage:"error occurred"});
    return res.status(200).send({success:'true',errormessage:'false',result:StockData});
}
module.exports={
    getALL
}