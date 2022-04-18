// Each order has created date and products and user who make this order

const mongoose = require('mongoose')


const OrderSchema = mongoose.Schema({
    Products :[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Product',
        require:true,
    }], 
    //Foreign KEY
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        require:true
    },
    creationData:{
        type:Date,
        default:Date.now,
        require:true
    }

})

var OrderModel = mongoose.model('Order',OrderSchema);

module.exports=OrderModel