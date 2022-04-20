const express = require('express')
const auth = require('../MiddleWare/auth')
var router = express.Router()

const{GetAllProducts,GetOneProduct,insertProduct,updateProduct,deleteProduct, GetAllProductsLike,GetAllProductsWithID}=
require('../controllers/productController')

router.use(auth.SellerCheck)
debugger

// To add new one product
router.post('/',async (req,res,next)=>
{
    var sellerId=auth.userFunc()
    var body = req.body
    body.sellerId = sellerId
    var addedproduct = await insertProduct(body)
     res.json(addedproduct)
})

 //To see his own products only
router.get("/",async (req,res,next)=>{

    var sellerId = auth.userFunc()
    var products= await GetAllProductsWithID(sellerId)
    res.json(products)
})

// To edit his own product only and specific Product with id  

router.patch('/:id',async (req, res, next)=>{

    // seller ID
    var {id} = req.params
    
    var productbody = req.body
    // update in product Controller to take two paramters
    var NewProduct = await updateProduct(id,productbody)
    res.json(NewProduct)
})

router.delete('/:id',async(req,res,next)=>{

    var {id} = req.params
    var deletedPro = await deleteProduct(id)
    debugger
    res.json(deletedPro)
    
})
module.exports=router