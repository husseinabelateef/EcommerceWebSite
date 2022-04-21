const express = require("express");
const fs = require("fs");
var app = express();
const cors=require("cors");
const mongoose=require("mongoose");
const http=require("http")
const socket=require("socket.io")
var users = require('./Routes/userRoutes')
var products=require('./Routes/productRoutes')
var sellersproduct = require('./Routes/sellerProductRoutes')
var Order = require('./Routes/OrderRoute');
require("dotenv").config();
console.log(process.env.CONNECTION_STRNG)
mongoose.connect(process.env.CONNECTION_STRNG,()=>{

    console.log("conected to db")
  
  })

//   mongoose.connect('mongod b://localhost:27017/EcommerceDB',(err)=>{
//     console.log("Connnect Succ.")
// })

  //mongoose.connect("")
  app.use(express.json());

  app.use("/user" , users)
  app.use("/product",products)
  app.use('/Sproduct',sellersproduct)
  app.use('/Order',Order);
  app.listen(3050, () => {
    console.log("app started listening on port 3050");
  });