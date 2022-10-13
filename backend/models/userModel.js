const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    email:{type:String, resquire:true},
    password:{type:String, resquire:true},
    role:{type:String, resquire:true, default:"guest"},
})
const user=mongoose.model("userData", userSchema);
module.exports=user;
