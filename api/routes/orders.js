const expres=require("express");
const mongoose = require("mongoose");
const order=require("../../models/orders")
const product=require("../../models/products")
console.log()
const router=expres.Router();
router.get("/",function(req,res,next){
    order.find( 
        
        
          ).populate("product","name price").then(result=>{
              res.status(200).json(result)
          }).catch(err=>{

            res.status(500).json({message:err.message})
          })
});

//////////?/////
router.put("/:id",function(req,res,next){
     order.updateOne({_id:req.params.id},{
     quantity:req.body.quantity

     },function(err,result){
         if(!err){
             if(result["nModified"]>0)
  res.status(200).json(result)
  else if(result["n"]>0){
      res.json({"already updated":"true","result":result})
  }
  else{
    res.json({"not found":"true","result":result})

  }


         }
         else{
             res.status(500).json({"invalid":err.message})
         }
     })
    });

 router.delete("/:id",function(req,res){
       order.deleteOne({_id:req.params.id}
      ).then(result=>{
          res.json(result["deletedCount"]>0?result:{"message":"not found"})

       })
        


        });

///////////////

//////////////////////////
router.get("/:id",function(req,res,next){
    order.findById(req.params.id, ).then(result=>{

        res.json({"orders":result||"nofound"})
    }).catch(err=>{
        res.json(err)
    })
            
          
            
    });

router.post("/",function(req,res,next){
  
console.log("waiting...")
 const ord=new order({
     _id:mongoose.Types.ObjectId(),
     product:req.body.pid,
     quantity:req.body.quantity



 });
 product.findById(req.body.pid,function(err,doc){

 if(doc!=null){

        console.log(doc["_id"])
 ord.save().then(result=>{
    res.status(200).json(result)
}).catch(err=>{
    res.status(500).json(err)
})
    }
    else{
        res.status("500").json({"found":true})
    }
 })

     
    });
////////////////
module.exports=router
