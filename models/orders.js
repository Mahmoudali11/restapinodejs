const mongoose=require("mongoose")
const orderSchema=mongoose.Schema({
_id:mongoose.Types.ObjectId,
product:{type:mongoose.Types.ObjectId,ref:"prod"},
quantity:{type:Number,default:1}
});
module.exports=mongoose.model("order",orderSchema)