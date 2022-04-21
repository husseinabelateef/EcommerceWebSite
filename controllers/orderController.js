const OrderModel = require("../Models/order")
const productModel = require("../Models/products")
const auth = require('../MiddleWare/auth')
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
        lisProduct.forEach(y=>{
            if(x.ProductId == y._id){
                {
                    y.quantity -x.quentity 
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