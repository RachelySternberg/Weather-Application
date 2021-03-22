const mongoose=require('mongoose');

const adminSchema=mongoose.Schema({
    adminName:{
        type:String,
        require
    },
    adminPassword:{
        type:String,
        minLength:8,
        require 
    },
    adminEmail:{
        type:String,
        require
    },
    users:[
        {type:mongoose.Schema.Types.ObjectId,ref:'User' }
   ]
})

module.exports=mongoose.model('Admin',adminSchema);