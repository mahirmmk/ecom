require("dotenv").config()
const mongoDBURL=process.env.MONGODBURL
const mongoose=require("mongoose");
mongoose.connect(`${mongoDBURL}`).then(connect=>{
    console.log("connected to mongoDB at "+ mongoDBURL)}).catch(err=>console.log("failed to connect with mongoDB "+err));

