const{DeliverTable}=require('../entity/DeliverTable')

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
   
        let UpdatedMat= await DeliverTable.findOneAndUpdate(req.params._id,req.body).then(function(dataobj){
            DeliverTable.findOne(req.params.id).then(function(dataobj){
                res.status(201).send({success:'true',errormessage:'false',result:dataobj})
            })
        }).catch(err =>{
            res.status(200).send({success:false,
                errormessage:'update failure',result:{}})
          
        })
        }
            
const deleteDel = async (req,res)=>{
    let deleted = await DeliverTable.findOneAndDelete(req.params._id)
    deleted ? res.status(200).send({success:'true',errormessage:'false',result:deleted}) :  res.status(400).send({success:false,message:"eroor"})
}
module.exports={
    getALL,
    CreateDel,
    getbyId,
    UpdateDEL,
    deleteDel
}