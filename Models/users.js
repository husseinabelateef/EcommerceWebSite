const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        minlength:3,
        maxlength:15,
        required:true,
    },
    //unique KEY
    userName:{
        type:String,
        minlength:3,
        maxlength:15,
        unique:true,
        required:true,
    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:15,
        required:true,
    },
    password:{
        type:String,
        minlength:4,
        maxlength:140,
        required:true
    } , 
    // seller Client
    role:{
        type:String,
        enum : ['Seller','User'],
        required:true,
    },
    dob:{
        type:Date,
        required:false
    } ,  
    createdAt:{
    type: Date, 
    default: Date.now 
    } , 
    updatedAt:{
        type: Date, 
        default: Date.now 
    }

})
userSchema.pre('save',function(){
    var salt = bcrypt.genSaltSync(10);
   this.password = bcrypt.hashSync(this.password, salt);
})
var userModel= mongoose.model('User',userSchema);

module.exports=userModel