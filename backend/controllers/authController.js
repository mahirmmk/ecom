const user=require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const { json } = require("express");
require("dotenv").config()

exports.signUp= async (req, res)=> {
    try{
        const {email, password}=req.body;
        const hash= await bcrypt.hash(password, 10);
        const result= await user.create({email:email, password:hash});
        res.status(201).json({
            message:`user created successfully ${email}`           
        })
        console.log(req.body)
    } catch(error) {
        res.status(400).json({
            message:"Could no create user, task failed"})    
    }
}

exports.logIn= async (req, res)=> {
    try{
        const {email, password}=req.body;
        const guest=await user.findOne({email:email});
        
        if(!guest){
           return res.status(401).json("Incorrect Email Adresss")            
        }
        const check=await bcrypt.compare(password, guest.password)
        if(!check){
            return res.status(401).json("Incorrect Password")
        }

        const token=jwt.sign({email:guest.email, userID:guest._id, role:guest.role},process.env.JWTKEY,{expiresIn: "1h"} )
        return res.status(200).json({
        message:`welcome ${email}`,
        token:token
        })            
    } catch(error) {
        return res.status(400).json({
            message:"Authentication failed",
            errorMessage:error
        })    
    }
}
exports.getAllUsers=async (req, res)=>{
    try{
        const allUsersData=await user.find();
        res.status(200).json({
        message:"all users fethced",
        allUsersData
    })

    }catch(error){
        res.status(505).json({
            message:"failed to fetch all users"
        })
    }
    
}