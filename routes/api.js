const router=require('express').Router();
const admin=require('../controllers/admin');
const user=require('../controllers/user');
const weather=require('../controllers/weather');

//Admin
router.post('/createAdmin',admin.createAdmin);
router.get('/getAllAdmin',admin.GetAllAdmin);
router.patch('/updateAdmin/:adminId',admin.updateAdmin);
router.delete('/deleteUserbByAdmin/:id',admin.deleteUserbByAdmin)

//Weather
router.get('/getWeather/:user',weather.getWeather);
router.delete('/deleteWeatherById',weather.deleteWeatherById)

//User
router.post('/newUser/:admin',user.createUser);
router.get('/getUserById/:id',user.getUser);
router.get('/createWeather',user.createWeather);


module.exports=router;
