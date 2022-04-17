const express = require('express')

var router = express.Router();

const {login ,GetAllUsers, GetOneUser , deleteuser,insertUser , updateUser} = 
require('../controllers/userController')
const auth = require('../MiddleWare/auth')

router.post("/" ,async (req, res, next) => {
    debugger;
    var body = req.body;
    var result = await insertUser(body)
    res.json(result);
  });
  debugger;
  router.post("/login", async (req, res, next) => {
    debugger;
    var token = await login(req.body);
    res.json({ token: token });
  });

  router.get('/',async  (req, res, next) => {
    debugger;
    var users = await GetAllUsers()
    res.json(users)
})
router.use(auth.Authent)
//create update delete Seller 

//without id get current
router.get("/:id",async (req, res, next) => {
  debugger;
  var { id } = req.params;
  var userId = auth.userFunc()
  if(id != userId)
  { 
      return res.status(401).end();
  }
  var user = await GetOneUser(id)
    res.json(user)
})
router.patch("/:id", async (req, res, next) => {
  debugger;
    var { id } = req.params;
    var userId = auth.userFunc()
    if(id != userId)
    {  //want to update foriegn users data
        return res.status(401).end();
    }
    var user = req.body;
    var result = await updateUser(id , user)
    res.json(result);
  });
  //Regester
  router.post("/" ,async (req, res, next) => {
    debugger;
    var body = req.body;
    var result = await insertUser(body)
    res.json(result);
  });
  router.delete("/:id" , async (req, res, next) => {
    try{
    debugger;
    var { id } = req.params;
    var userId = auth.userFunc()
    if(id != userId)
    {  //want to Delete foriegn users data
         res.status(401).json({message:"Not Autherized"});
    }
    else
    {
    var result =  await deleteuser(id)
    console.log(result)
    res.json({message: result});
    }
  }
  catch(error){
    res.status(401).json({message:"Not Autherized"});
  }
  });
 

module.exports = router