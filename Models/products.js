const mongoose = require('mongoose')


const productSchema = mongoose.Schema({

    name:{
        type :String,
        require:true,
    },
    description:{
        type:String,
        require:false
    },
    photo:{
        type:String,
        require:true,
    }, 
    //Foreign KEY
    sellerId:{
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

var productModel=mongoose.model('Product',productSchema);

module.exports=productModel