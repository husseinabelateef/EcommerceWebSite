const productModel = require("../Models/products")
const auth = require('../MiddleWare/auth')

function GetAllProducts(){
    
    var products = productModel.find({});
    return products
}

function GetAllProductsWithID(id){
    
    var products = productModel.find({}).where('sellerId').equals(id)
    return products

}
function GetAllProductsLike(name){
    var products = productModel.find({name: { $regex: '.*' + name + '.*' } })
    return products
}
function GetOneProduct(name){
    var product = productModel.findOne({name:name})
    return product
}
async function GetSellerProducts(sellerName){
    debugger; 
    var products = await productModel.find({}).populate({path :'sellerId', select :'userName', 
    match: { userName: sellerName }})  
    var result =  products.filter(x=> x.sellerId!= null) 
    return result
}
function insertProduct(product){

    var newproduct= productModel.create(product)
    return newproduct
}

async function updateProduct(pid , product)
{
    var id = pid
    var currentSellerId = auth.userFunc()
    var pro = await productModel.findOne({_id:id})
    if(pro.sellerId == currentSellerId){
    var newProduct = await productModel.findOneAndUpdate({_id:id},{
        name:product.name,
        description:product.description,
        photo:product.photo,
        creationData:product.creationData,
        quantity:product.quantity
        
    },{
        new:true
    })
    return newProduct
}
else 
return {"message":"Not Authorized"}
    
}

async function deleteProduct(pid){
    var currentSellerId = auth.userFunc()
    var pro = await productModel.findOne({_id:pid})
    if(pro.sellerId == currentSellerId){
    var deletedProduct = await productModel.deleteOne({_id:pid})

    return deletedProduct
    }
    else
    return {"message":"Not Authorized"}
    
}

module.exports={GetSellerProducts ,GetAllProducts,GetOneProduct,insertProduct,updateProduct,deleteProduct,GetAllProductsLike,GetAllProductsWithID}