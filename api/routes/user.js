const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const user=require("../../models/users")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

router.post("/signup",async function(req,res,next)  {
    console.log(await bcrypt.genSalt(1))
/////////////
const u=user({
    _id:mongoose.Types.ObjectId(),
    name:req.body.name,
    email:req.body.email,
    password:await bcrypt.hash(req.body.password,1 ) 
 


})

////////////

user.findOne({email:req.body.email}).then(result=>{
    if(result==null)
    u.save().then(result=>{
        res.status(200).json({usercreated:result})
        
        }).catch(err=>{
            res.status(500).json({message:err["message"]})
        })
else        
    res.status(500).json({"message":"user allready exists"})
}).catch(err=>res.status(500).json(err["message"]))


})
////////////////deleting
router.delete("/:id",function(req,res,next){
    user.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(500).json(err)
    })
////////////
   
 
 
 })
////////////////////////////
 router.post("/login",function(req,res,next){
    user.findOne({email:req.body.email}).then(result=>{
        if(result!=null){
      bcrypt.compare(req.body.password,result.password).then(result=>{
          if(result)
          {
              jwt.sign({
                email:result.email,
                _id:result._id,


              },process.env.JWT_KEY)
           res.status(200).json({"message":"auth Succeeded","isvalid":true})
        }

          else{
              res.status(401).json({"message":"email or password in correct!"})
          }
      }).catch(err=>{
          res.status(500).json({message:err.message})

      })


        }
        else{
            res.status(401).json({"message":"email or password in correct!"})
        }
 

    }).catch(err=>{
        res.status(500).json({"message":err.message})
    })

})



module.exports=router