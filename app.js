const express = require("express");
const app = express();
const productRouter=require("./api/routes/product")
const orderRouter=require("./api/routes/orders")
const mongoose=require("mongoose")
require('dotenv').config()
 


const cors=require("cors")

const morgan=require("morgan");

const userRoute=require("./api/routes/user")
mongoose.connect('mongodb://'+process.env.DB_h+'/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then( function (s){
   console.log("connected")
}); 


  //middleware
//
//orders

app.use(morgan("dev"))
app.use(express.json())

//app.use(express.urlencoded({extends:false}))
//
//app.use(cors())
var corsOptions = {
   origin: 'http://example.com',
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
 }
 app.use(cors(corsOptions))
 /////////////////////routes
 app.use("/uploads",express.static('uploads'))
app.use("/products",productRouter)

app.use("/orders",orderRouter)
app.use("/user",userRoute)
//this catch any error less 500 status code
app.use(function(req,res,next){
   console.log("1")
    const error=Error("NOT Found!")
    error.status=404
    //res.send(error)
    next(error)
 })
app.use(function (err, req, res, next) {
   console.log(2)
     res.status(err.status||500).json({'messagem':err.message})
  });
 
//
module.exports = app
