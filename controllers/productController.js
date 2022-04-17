const productModel = require("../Models/products")

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

function insertProduct(product){

    var newproduct= productModel.create(product)
    return newproduct
}

function updateProduct(product){

    var id=product._id
    var newProduct =productModel.findOneAndUpdate({_id:id},{
        name:product.name,
        description:product.description,
        photo:product.photo,
        creationData:product.creationData
        
    },{
        new:true
    })
    return newProduct
}

function deleteProduct(product){
    
    var id =product._id
    var deletedProduct = productModel.deleteOne({_id:id})

    return deletedProduct
    
}

module.exports={GetAllProducts,GetOneProduct,insertProduct,updateProduct,deleteProduct,GetAllProductsLike,GetAllProductsWithID}