const express = require('express');
const auth = require('../MiddleWare/auth');
var router = express.Router();
const {createOrder} = require('../controllers/orderController');

router.use(auth.userCheck)
router.post("/",async (req,res,next)=>{
    debugger
    var ordercreate = req.body
   var order = await createOrder(ordercreate)
   console.log("----Final Response Here----")
   console.log(order)
    res.json(order)
})

module.exports=router;