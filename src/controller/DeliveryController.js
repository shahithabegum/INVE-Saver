const{DeliverTable}=require('../entity/DeliverTable')
const{MaterialTable}=require('../entity/MaterialTable')
const {StockTable}=require('../entity/Stock')
const getALL = async (req,res)=>{
    let MaterialData= await DeliverTable.find();
    if(!MaterialData) return res.status(200).send({success:'false',errormessage:"error occurred"});
    return res.status(200).send({success:'true',errormessage:'false',result:MaterialData});
}
 const CreateDel =async (req,res)=>{

    console.log("trequest",req.body)
    let AddMaterial= new DeliverTable({
        materialname:req.body.materialname,
        month:req.body.month,
        date:req.body.date,
        quantity:req.body.quantity,
        description:req.body.description,
        vasselname:req.body.vasselname })
       await AddMaterial.save()
       let stockData= await StockTable.findOne({materialname:req.body.materialname});
       console.log("stockdata",stockData)
       let quantity=stockData.stock-req.body.quantity
      console.log("quanity",quantity)
    
        await StockTable.findOneAndUpdate({materialname:req.body.materialname},{stock:quantity})
       
            res.status(200).send({
                status:'true',
                success:'true',
                errormessage:"false",
                result:AddMaterial
            })
        }
      
 const getbyId = async (req,res)=>{
    let GetbyId= await DeliverTable.findById(req.params._id)
    GetbyId ? res.status(200).send({success:'true',errormessage:'false',result:GetbyId})
:   
        res.status(400).send({success:false,message:"eroor"})
   
 }

 const UpdateDEL =async (req,res)=>{
    var d=await DeliverTable.findById(req.params._id)
        let UpdateDel= await DeliverTable.findByIdAndUpdate(req.params._id,req.body,{new:true})

        UpdateDel ? res.status(201).send({success:'true',errormessage:'false',result:UpdateDel}):res.status(200).send({success:false,
            errormessage:'update failure',result:{}})

         let s=   await StockTable.findOne({materialname:req.body.materialname}).then()
         let change = s.stock
         console.log("change",change)
         const perivousvalue=d.quantity;
         console.log("previousvalue",perivousvalue)
         let curenrvalue=UpdateDel.quantity;
         console.log("current",curenrvalue)
         
        
         if(perivousvalue <= curenrvalue){
            let expr=curenrvalue-perivousvalue;
            change=change-expr;
            console.log("expr",expr)
            console.log("change",change)
            let su= await StockTable.findOneAndUpdate({materialname:req.body.materialname},{stock:change})
         }
         else{
            let expr=perivousvalue-curenrvalue;
            change=change+expr;
            console.log(change)
            let su= await StockTable.findOneAndUpdate({materialname:req.body.materialname},{stock:change})
         }
        }
            
const deleteDel = async (req,res)=>{
    let deleted = await DeliverTable.findOneAndDelete(req.params._id)
    deleted ? res.status(200).send({success:'true',errormessage:'false',result:deleted}) :  res.status(400).send({success:false,message:"eroor"})
    let name=deleted.materialname
    let deletedQuantity=deleted.quantity;
  
    let s = await StockTable.findOne({materialname:name})
    let perivousvalue=s.stock;
    
    let material= await DeliverTable.find({materialname:name});
    
   
    if(material.length>=1){
        let change=perivousvalue-deletedQuantity
       
        await StockTable.findOneAndUpdate({materialname:name},{stock:change})
    }
    else{
        await StockTable.findOneAndDelete({materialname:name})
       
    }
}
module.exports={
    getALL,
    CreateDel,
    getbyId,
    UpdateDEL,
    deleteDel
}