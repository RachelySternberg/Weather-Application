const mongoose=require('mongoose');

const weatherSchema=mongoose.Schema({
    date:{
        type:String,
        require
    },
    city:{
        type:String,
        require
    },
    temperature:{
        type:String,
        require
    },
    wind:{
        speed:String,
        deg:String  
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    }
})

module.exports=mongoose.model('Weather',weatherSchema);