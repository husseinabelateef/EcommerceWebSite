const express = require('express')
const auth = require('../MiddleWare/auth')
var router = express.Router()

const{GetAllProducts,GetOneProduct,insertProduct,updateProduct,deleteProduct, GetAllProductsLike,GetAllProductsWithID}=
require('../controllers/productController')

router.use(auth.SellerCheck)
debugger

// To add new one product
router.post('/:id',async (req,res,next)=>{
  
    var {id} = req.params
    var sellerId=auth.userFunc()
    debugger
    if(id!=sellerId){
        return res.status(401).json({message:"This Seller is not autherized to add new product"});
    }
    var body=req.body
    var addedproduct = await insertProduct(body)
     res.json(addedproduct)
})

 //To see his own products only
router.get("/:id",async (req,res,next)=>{
    var {id}=req.params
    var sellerId = auth.userFunc()
   
    if(id!=sellerId){
        debugger
        return res.status(401).json({message:"This Seller is not autherized to see new product"});
    }
    var products= await GetAllProductsWithID(id)
    res.json(products)
})

// To edit his own product only 

router.patch('/:id',async (req, res, next)=>{

    // seller ID
    var {id} = req.params
    var sellerId = auth.userFunc()
    var productbody = req.body
    if(id!=sellerId){
        debugger
        return res.status(401).json({message:"This Seller is not autherized to edit this product"});
    }
    var NewProduct = await updateProduct(productbody)
    res.json(NewProduct)
})

router.delete('/:id',async(req,res,next)=>{

    var{id}=req.params
    var {pId}=req.params
    var sellerId=auth.userFunc()
    if(id!=sellerId){
        return res.status(401).json({message:"This Seller is not autherized to delete this product"});
    }
     var productbody = req.body
    var deletedPro = await deleteProduct(productbody)
    debugger
    res.json(deletedPro)
    
})
module.exports=router