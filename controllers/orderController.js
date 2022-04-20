const OrderModel = require("../Models/order")
const productModel = require("../Models/products")
const auth = require('../MiddleWare/auth')
async function createOrder(order)
{debugger
    console.log(order)
    var flag = true
    var currentUser = auth.userFunc()
    order.Products.filter(async (x)=>{
        debugger
        var castingQ = parseInt(x.quentity)
        var product = await productModel.findOne({$and: [ { quantity: { $le: castingQ }},{_id:x.ProductId} ]})
        
        console.log(product)
        if( product == null )
        {
            flag = false
        }
        else{
            product.quantity = product.quantity -  x.quentity
        }
    })
   
   
    console.log(flag)
if(flag)
{
    var newOrder= await OrderModel.create(order)
    
    console.log(newOrder)

    return newOrder
}
else
return {"message":"products Can't Cover order"}
}


module.exports={createOrder}