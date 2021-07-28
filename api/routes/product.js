const expres=require("express");
const cors=require("cors");
const Product=require("../../models/products.js");
const mongoose=require("mongoose")
const multer=require("multer")
var storag = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      console.log(file.size)
      cb(null, file.originalname)
    }
  })
  

const uploader=multer({storage:storag,fileFilter:function (req,file,cby){
console.log(file.size)
if((file.mimetype=='image/png'|| file.mimetype=='image/jpeg'||file.mimetype=='video/mp4'))

cby(null,true)
else{
  console.log("what gose wrong?"+file.size)
  cby(Error("not defiend image select png one "),false)
}

},limits:{fileSize:7555431100}})
const router=expres.Router();
//const mongoose=require("mongoose");
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
router.get("/",cors(corsOptions),function(req,res,next){

 //this line like return no code after that excecuted
   Product.find(function(err,docs){
if(!err){
    console.log("ds"+docs)
    res.status(200).json({
        "products":  docs.map(result=>{
  return{"url":result.pimg}
        })
          
     })
 
}
else{
    console.log(err.message)
}


 })

},);
///
router.post("/",uploader.single('pimg')

,function(req,res,next){
    console.log("opss!"+req.file.size)
    const product=new  Product({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        pimg:"http://localhost:3000/uploads/"+req.file.originalname



    }
 
    );
     

    product.save().then(result=>{
       
        res.status(200).json({
        
            message:"hi from get method on ",
            productcreated:result
    
        })
    }).catch(err=>{
      console.log("sorry")
        res.status(500).json({"opss!":err})}
        );
////////
  
    });
//////////////
router.put("/:id",function(req,res,next){
    Product.updateOne({_id:req.params.id},req.body)
    .then(result=>{

        res.status(200).json({"upadetd":result})}).catch(err=>{
            res.status(500).json({"message":err.message})
        })
     });                      

 router.delete("/:id",async function(req,res) {
     
       Product.deleteOne({_id:req.params.id}).then(function(result){

  console.log("1@")

        res.status(200).json({deleting:result})
       }).catch(function(err){
           res.status(500).json({errr:err.message})

       })
       console.log("2#")

        });

///////////////

/////
router.get("/:id",function(req,res,next){
  Product.findById(req.params.id,function(err,doc){

if(!err)
    if(doc){
     
        
          res.status(200).json({"doc":doc})
    }
    else {
        res.status(404).json({"not found":null})
 
    }
else{
  res.status(500).json({"in valid id":err.message})

}
    
  })
    
    });

 
////////////////
module.exports=router
