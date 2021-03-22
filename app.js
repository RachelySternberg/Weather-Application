const express=require('express');
const mongoose=require('mongoose');
const router=require('./routes/api');
const bodyParser=require("body-parser");
const dotenv=require('dotenv');
dotenv.config();
const app=express();

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT,connectionParams)
.then(()=>{
    console.log("connecting to db")
})
.catch((err)=>{
    console.log("error:" +err)
})

app.use(bodyParser.json())
app.use('/',router);

app.listen(7000, ()=>{
    console.log("listening on port 7000")
})