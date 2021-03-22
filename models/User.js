const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        require
    },
    userPassword:{
        type:String,
        minlength:8,
        require
    },
    userMail:{
        type:String, 
        require 
    },
    weathers:[
        {type:mongoose.Schema.Types.ObjectId,ref:'Weather' }
   ],
   admin:{
    type:mongoose.Schema.Types.ObjectId, ref:'Admin'
}
  
})

module.exports=mongoose.model('User', userSchema);