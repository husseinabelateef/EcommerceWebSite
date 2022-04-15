const express = require("express");
const fs = require("fs");
var app = express();
const cors=require("cors");
const mongoose=require("mongoose");
const http=require("http")
const socket=require("socket.io")
 var users = require('./Routes/userRoutes')

require("dotenv").config();
console.log(process.env.CONNECTION_STRNG)
mongoose.connect(process.env.CONNECTION_STRNG,()=>{

    console.log("conected to db")
  
  })
  app.use(express.json());

  app.use("/user" , users)

  app.listen(3051, () => {
    console.log("app started listening on port 3051");
  });