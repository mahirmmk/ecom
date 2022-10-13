const express=require("express")
const jwt=require("jsonwebtoken")

module.exports=(req, res, next)=>{
    try{
        let userToken=req.headers.authorization?.split(" ")[1];
        const verify=jwt.verify(userToken, process.env.JWTKEY)
     
        req.userData={
            email:verify.email,
            userID:verify.userID,
            role:verify.role
        }
        next();
       
    }catch(err) {
        console.log(err)
    }

}
