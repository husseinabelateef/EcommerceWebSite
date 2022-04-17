const userModel = require("../Models/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
async function GetAllUsers(){
 try 
{
  var users = await userModel.find({});
  return users
}
  catch(error){
    return error.message;
}
}
async function GetOneUser(id){

  var users = await userModel.findOne({_id :id})
  return users;
  }
  //regester
async function insertUser (user)
  {
try{
    debugger;
      var newuser= await userModel.create(user);
      return newuser;
}
catch(error){
    return error.message;
}
  }

  async function updateUser (id , user){
     try{
    var newUser = await userModel.findOneAndUpdate({_id:id},{
      firstName:user.firstName,
      lastName:user.lastName,
      password:user.password,
      role:user.role,
      userName:user.userName,
      dob:user.dob,
      updatedAt:Date.Now
    }, 
    {
      new: true
    })
    return newUser
  }
    catch(error){
      return error.message;
  }
   
  }
   async function deleteuser(id){
    debugger;
    var res ;
    try{
    res =  await  userModel.deleteOne({_id:id})
    if(res.acknowledged)
    {
      return "Deleted Successfully";
    }
    }
    catch(err){
      return err.message();
    }

  }
  async function login({ userName, password }) {
    try{
      var user = await userModel.findOne({"userName": userName});
  
    if (user) 
    {
      var valid = await bcrypt.compare(password, user.password);
      debugger;
      if (valid) {
        return jwt.sign(
          {
            userName: user.userName,
            _id: user._id,
            role:user.role
          },
          process.env.secretKey,
          { expiresIn: "1h" }
        );
      }
      else {
        res.status(401).end();
      }
    } 
    else 
    {
      res.status(422).end();
    }
  }
  catch(error){
    return error.message;
  }
  }
module.exports = {login,GetAllUsers, GetOneUser , deleteuser,insertUser , updateUser}