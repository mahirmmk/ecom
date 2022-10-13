const express = require("express");
const { signUp,logIn, getAllUsers} = require("../controllers/authController");
const authRoute=express.Router();

authRoute.post("/signUp", signUp)
authRoute.post("/logIn", logIn)
authRoute.get("/allusers", getAllUsers)


module.exports=authRoute;