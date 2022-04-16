const express = require('express')

var router = express.Router()

const{GetAllProducts,GetOneProduct,insertProduct,updateProduct,deleteProduct, GetAllProductsLike} =
require('../controllers/productController')
 
router.get("/",async (req,res,next)=>{
    var products= await GetAllProducts()
    res.json(products)
})

router.get('/:name',async (req,res,next)=>{

    var {name}=req.params
    var product = await GetOneProduct(name)
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