const OrderModel = require("../Models/order")
const productModel = require("../Models/products")
const auth = require('../MiddleWare/auth')
const{updateProduct} = require('../controllers/productController')
async function createOrder(order)
{debugger
    console.log("order comming from request body here")
    console.log(order)
    var flag = true
    var currentUserId = auth.userFunc()
    console.log("products comming from request body here")
    console.log(order.Products)
    var lisProduct  = await productModel.find({ }).exec();
    var res = order.Products.forEach(x=>{
        lisProduct.forEach(y=>{
            if(x.ProductId == y._id){
                {
                    if(x.quentity > y.quantity)
                    flag=false
                }
            }
        })
    })
    console.log(lisProduct)
    console.log("Flag Here ")
    debugger
    console.log(flag)
if(flag)
{debugger
     order.Products.forEach(x=>{
        lisProduct.forEach(async (y)=>{
            if(x.ProductId == y._id){
                {
                    debugger; 
                    var updatedPro = y
                    console.log(x.ProductId.toString())
                    updatedPro.quantity -= x.quentity
                    var newProduct = await productModel.findOneAndUpdate({_id:y._id},{
                        name:updatedPro.name,
                        description:updatedPro.description,
                        photo:updatedPro.photo,
                        creationData:updatedPro.creationData,
                        quantity:updatedPro.quantity
                        
                    })
                    // await updateProduct(x.ProductId.toString() , updatedPro);
                    
                }
            }
        })
    })
    order.userId=currentUserId;
    var newOrder= await OrderModel.create(order)
    console.log("After creation order here")
    console.log(newOrder)

    return newOrder
}

else{
    debugger
return {"message":"products Can't Cover order"}
}
}


module.exports={createOrder}