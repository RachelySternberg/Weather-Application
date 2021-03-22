const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const request = require('request');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const Weather = require('../models/Weather');
const User = require('../models/User');
dotenv.config();

const getUser = async (req, res) => {
    console.log("get user")
    try {
        //.findById(req.params.name); 
        currentUser = await User.findById(req.params.id)
        console.log(currentUser)
        if (currentUser == null) {
            res.status(200).json({ "messege": "don't have this user,you need to register" });
            //this.createUser();
        }
        else {
            if (currentUser.password == req.body.password) {
                let token = jwt.sign({ name: req.body.name, password: req.body.password }, process.env.ACSSES_TOKEN_SECRET)
                console.log(token);
                res.status(200).json({ "messege": "You have successfully logged in", token,currentUser });
                //let decoded = jwt.verify(token, process.env.ACCCESS_TOKEN_SECRET)
                // console.log(decoded);
            }
            else {
                res.status(200).json({ "messege": "The password is incorrect, please try again" });
            }
        }
    }
    catch (error) {
        res.status(400).json({ errorMessege: error.errorMessege });
    }
  }

  const createUser = async (req, res) => {
    let newUser = new User(req.body);
    console.log("new usre:" + newUser);
    newUser.admin = req.params.admin;
  
    try {
      await newUser.save();
      await Admin.findByIdAndUpdate(req.params.admin, { $push: { users: newUser._id } })
      let token = jwt.sign({ password: req.body.password, name: req.body.name, email: req.body.email }, process.env.ACSSES_TOKEN_SECRET)
      // let token = jwt.sign({ name: req.body.name, password: req.body.password }, process.env.ACSSES_TOKEN_SECRET)
      console.log(token);
      res.status(200).json({ user: newUser, token })
      sendMail(newUser.mail, newUser.name)
      // nodeMailer.sendMailToNewUser(newUser.mail);
  
    }
    catch (error) {
      res.status(400).send(error)
    }
  }

  const createWeather = async (req, res) => {
    let decoded = jwt.verify(req.headers['authorization'], process.env.ACSSES_TOKEN_SECRET)
    console.log(decoded); 
    if(decoded.name!=req.body.name){
  res.status(401).json({"messege":"the token is invalid"})
    }
      try {
      let city = req.body.city
      console.log(city)
      const data = await requestApi(city)
  
      let weather = JSON.parse(data)
      console.log("resss : " + weather.main)
  
      let user =decoded.user;
      console.log(user)
      // console.log("the data is"+data)
      const cWeater = new Weather(weather.main);
      cWeater.city = city;
      cWeater.wind.speed = weather.wind.speed;
      cWeater.wind.deg = weather.wind.deg
      cWeater.user = user;
      await cWeater.save()
      console.log("the Weatheris:" + cWeater)
      console.log("ther res isssss" + data)
      let arrUser = await User.findByIdAndUpdate(req.body.user, { $push: { weathers: cWeater._id } })
      await arrUser.save();
      res.status(200).json({ newWeather: cWeater })
    }
    catch (error) {
      res.status(400).send(error)
    }
  }

  const requestApi = (city) => {
    return new Promise((resolve, reject) => {
  
      console.log('requestApi');
      let options = {
        method: "GET",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY_WEATHER}`
      }
  
      request(options, (err, res, body) => {
        if (err)
          reject(err)
  
        else {
          resolve(body)
          //  console.log(body)
        }
      })
  
    })
  }


  module.exports = { createUser, getUser, createWeather}

  const sendMail = (mail, name) => {
    return new Promise((resolve, reject) => {
  
      console.log(`mail: ${mail}`);
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rachelistern15@gmail.com',
          pass: process.env.PASSWORDMAIL
        }
      });
  
      var mailOptions = {
        from: 'rachelistern15@gmail.com',
        to: mail,
        subject: `Welcome ${name}!!!`,
        text: 'Hi We are happy for your joining!! '
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error)
          //   console.log(`error ${error}`);
        } else {
          resolve(info)
          //   console.log('Email sent: ' + info.response);
        }
      });
  
    })
  }
  