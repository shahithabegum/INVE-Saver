const{MaterialTable}=require('../entity/MaterialTable')
const {StockTable}=require('../entity/Stock')
const {DeliverTable}=require("../entity/DeliverTable");
const {User}=require("../entity/User")

const getALL = async (req,res)=>{
    let MaterialData= await MaterialTable.find();
    if(!MaterialData) return res.status(200).send({success:'false',errormessage:"error occurred"});
    return res.status(200).send({success:'true',errormessage:'false',result:MaterialData});
}
 const CreateMat =async (req,res)=>{
  
    let AddMaterial= new MaterialTable({
        materialname:req.body.materialname,
        month:req.body.month,
        date:req.body.date,
        quantity:req.body.quantity,
        description:req.body.description,
        amount:req.body.amount })
       await AddMaterial.save()
       
       let MaterialData= await MaterialTable.find({materialname:req.body.materialname});
       let quantity=0
       MaterialData.forEach(item =>{
        quantity=quantity+item.quantity
       })
       let deliveryData=await DeliverTable.find({materialname:req.body.materialname})
       let deliverquantity=0
       deliveryData.forEach(item=>{
        deliverquantity=deliverquantity+item.quantity
       })
       quantity=quantity-deliverquantity
       if(MaterialData.length>1){
        await StockTable.findOneAndUpdate({materialname:req.body.materialname},{stock:quantity})
       }else{
        let Stock=new StockTable({
            materialname:req.body.materialname,
            stock:quantity
        })
        await Stock.save()
       }
    //    console.log("md",MaterialData)

            res.status(200).send({
                status:'true',
                success:'true',
                errormessage:"false",
                result:AddMaterial
            })

        }
      
 const getbyId = async (req,res)=>{
    let GetbyId= await MaterialTable.findById(req.params._id)
    GetbyId ? res.status(200).send({success:'true',errormessage:'false',result:GetbyId})
:   
        res.status(400).send({success:false,message:"eroor"})
   
 }

 const UpdateMAT =async (req,res)=>{
        var d=await MaterialTable.findById(req.params._id)
     
                
           
       let UpdatedMat= await MaterialTable.findByIdAndUpdate(req.params._id,req.body,{new:true});
    
        UpdatedMat ? res.status(201).send({success:'true',errormessage:'false',result:UpdatedMat}):res.status(200).send({success:false,
                    errormessage:'update failure',result:{}})
       
                 let s=   await StockTable.findOne({materialname:req.body.materialname}).then()
                 let change = s.stock
                 console.log("change",change)
                 const perivousvalue=d.quantity;
                 console.log("previousvalue",perivousvalue)
                 let curenrvalue=UpdatedMat.quantity;
                 console.log("current",curenrvalue)
                 
                
                 if(perivousvalue <= curenrvalue){
                    let expr=curenrvalue-perivousvalue;
                    change=change+expr;
                    console.log("expr",expr)
                    console.log("change",change)
                    let su= await StockTable.findOneAndUpdate({materialname:req.body.materialname},{stock:change})
                 }
                 else{
                    let expr=perivousvalue-curenrvalue;
                    change=change-expr;
                    console.log(change)
                    let su= await StockTable.findOneAndUpdate({materialname:req.body.materialname},{stock:change})
                 }

        }
            
const deleteMat = async (req,res)=>{
    let deleted = await MaterialTable.findOneAndDelete(req.params._id)
    deleted ? res.status(200).send({success:'true',errormessage:'false',result:deleted}) :  res.status(400).send({success:false,message:"eroor"})
    let name=deleted.materialname
    let deletedQuantity=deleted.quantity;
  
    let s = await StockTable.findOne({materialname:name})
    let perivousvalue=s.stock;
    
    let material= await MaterialTable.find({materialname:name});
    
   
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
    CreateMat,
    getbyId,
    UpdateMAT,
    deleteMat,
    
}