const{MaterialTable}=require('../entity/MaterialTable')

const getALL = async (req,res)=>{
    let MaterialData= await MaterialTable.find();
    if(!MaterialData) return res.status(200).send({success:'false',errormessage:"error occurred"});
    return res.status(200).send({success:'true',errormessage:'false',result:MaterialData});
}
 const CreateMat =async (req,res)=>{

    console.log("trequest",req.body)
    let AddMaterial= new MaterialTable({
        materialname:req.body.materialname,
        month:req.body.month,
        date:req.body.date,
        quantity:req.body.quantity,
        description:req.body.description,
        amount:req.body.amount })
       await AddMaterial.save()
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
   
        let UpdatedMat= await MaterialTable.findOneAndUpdate(req.params._id,req.body).then(function(dataobj){
            MaterialTable.findOne(req.params.id).then(function(dataobj){
                res.status(201).send({success:'true',errormessage:'false',result:dataobj})
            })
        }).catch(err =>{
            res.status(200).send({success:false,
                errormessage:'update failure',result:{}})
          
        })
        }
            
const deleteMat = async (req,res)=>{
    let deleted = await MaterialTable.findOneAndDelete(req.params._id)
    deleted ? res.status(200).send({success:'true',errormessage:'false',result:deleted}) :  res.status(400).send({success:false,message:"eroor"})
}
module.exports={
    getALL,
    CreateMat,
    getbyId,
    UpdateMAT,
    deleteMat
}