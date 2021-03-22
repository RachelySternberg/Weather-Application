const Weather=require("../models/Weather");
const dotenv=require('dotenv');
const User = require('../models/User');
dotenv.config();


const getWeather = async (req, res) => {
    console.log("get weather")
    try {
    
      let currentWeather = await Weather.find({ "user": req.params.user })

      console.log(currentWeather)
      if (currentWeather<1)
      {
        res.status(200).json({ "messege": "There is no weather for this user" });
       
      }
      
        else {
          res.status(200).json({ "messege": "You have successfully logged in",currentWeather});
        }
      }
 
    catch (error) {
      res.status(400).json({ errorMessege: error });
    }
  }

  const deleteWeatherById=async(req,res)=>{
    console.log("this is delete Weather")
 
 try{
  let weather;
   weather=await Weather.findOneAndDelete({ "user": req.body.user,"_id":req.body.id })
   
// console.log(weather)
  await User.findByIdAndUpdate(weather.user,{$pull:{weathers:weather._id}})
  
  // await weather.remove()
  // await weather.save()
    res.status(200).json({"messege":"the weather is deleted",weather})
 }
 catch(err){
    res.status(500).json({err:err.mssage})
 }
 }  



module.exports={getWeather,deleteWeatherById};