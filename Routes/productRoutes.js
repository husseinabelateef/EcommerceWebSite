const express = require('express')
const auth = require('../MiddleWare/auth')
var router = express.Router()

const{GetAllProducts,GetSellerProducts,GetOneProduct,GetAllProductsLike} =
require('../controllers/productController')
const {createOrder} = require('../controllers/orderController')
router.post("/order/",async (req,res,next)=>{
    debugger
    var ordercreate = req.body
   var order = await createOrder(ordercreate)
   console.log("----from Routes----")
   console.log(order)
    res.json(order)
})
//Anonumous User Get All Products"See Products"
router.get("/",async (req,res,next)=>{
    var products= await GetAllProducts()
    res.json(products)
})

router.use(auth.userCheck)
//Regestered User search by seller Name
router.get('/:sellername',async (req,res,next)=>{

    var {sellername}=req.params
    var product = await GetSellerProducts(sellername)
    res.json(product)

})

//TODO : Fixed IT
router.get("/like/:name",async(req,res,next)=>{

    var {name}=req.params
    var products = await GetAllProductsLike(name)
    debugger
    res.json(products)
})


module.exports=router