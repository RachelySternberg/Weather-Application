const Admin=require("../models/Admin");
const User = require('../models/User');
const Weather = require('../models/Weather');

//to do:  loginAdmin
//CreateAdmin
const createAdmin=async(req,res)=>{
    let createAdmin=new Admin(req.body);
    console.log(createAdmin);
    try{
        await createAdmin.save();
        res.status(200).json({createAdmin:createAdmin});
    }
    catch(error){
        res.status("error:",error.message)
    }
}

//GetAllAdmin
const GetAllAdmin=async(req,res)=>{
    try{
        let admins=await Admin.find();
        if(admins){
            res.status(200).json({"The_Admin" :admins});
        }else{
            res.status(500).json({"message":"dont have admin"});
        }
    }catch(error){
        res.status(500).json({"error":error})
    }
}

//UpdateAdmin
const updateAdmin=async(req,res)=>{
    console.log("Update")
    try{
        await Admin.findByIdAndUpdate(req.params.adminId,req.body)
        res.status(200).send("The admin is update")
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const deleteUserbByAdmin = async (req, res) => {
    console.log("delete User by Admin")
    try {
      let user= await User.findOne({"_id":req.params.id })
      console.log("the user is"+user)
    await Weather.deleteMany({user:user._id})
        // Weather.save()
    // console.log (weather)
    //   await Weather.remove({user:user._id})
        await Admin.findByIdAndUpdate(user.admin,{$pull:{users:user._id}})
        await User.findByIdAndRemove(user._id)
        
        // await user.remove()
        res.status(200).json({"mssage":"the user is deleted"})
       
    }
    catch (err) {
        res.status(500).json({ err: err.mssage })
    }
} 


module.exports={createAdmin,GetAllAdmin,updateAdmin,deleteUserbByAdmin}
