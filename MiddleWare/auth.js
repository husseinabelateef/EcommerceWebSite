const jwt = require("jsonwebtoken");
require("dotenv").config();

var currentUserId;

const userCheck = (req, res, next) => {
    try{
    var { authorization } = req.headers;
    debugger;
    jwt.verify(authorization, 
      process.env.secretKey, 
      function (err, decoded) 
      {debugger;
          if(decoded.role == "User")
          {
            debugger;
            currentUserId = decoded._id
            next();
          } 
          else
          {
            return res.status(403).end(); //Forbidden
          }
        if (err) 
        {
          return res.status(401).end();
        }
      
      });
    const us = jwt.verify(authorization, process.env.secretKey)
    
    }
    catch(error){
      return res.status(401).send(error.message);
    }
  };
const userFunc = ()=>{
  return currentUserId
}
  const SellerCheck = (req, res, next) => {
    try{
    var { authorization } = req.headers;
    debugger;
    jwt.verify(authorization, 
      process.env.secretKey, 
      function (err, decoded) 
      {
        if(err) 
        {
          return res.status(401).end();
        }
        if(decoded.role == "Seller")
        {
          currentUserId=  decoded._id
          next();
        }
        else{
            return res.status(403).end(); //Forbidden
        }
        
      
      });
    }
    catch(error){
      return res.status(401).send(error.message);
    }
  };
  const Authent = (req, res, next) => {
    try{
    var { authorization } = req.headers;
    debugger;
    jwt.verify(authorization, 
      process.env.secretKey, 
      function (err, decoded) 
      {
        if(err) 
        {
          return res.status(401).end();
        }
        console.log(decoded)
        currentUserId=  decoded._id
        console.log(currentUserId)
        console.log(typeof(currentUserId))
       

        next();
      });
    }
    catch(error){
      return res.status(401).send(error.message);
    }
  };
  module.exports ={ userFunc , userCheck , SellerCheck ,Authent};
  