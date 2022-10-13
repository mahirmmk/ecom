const express= require("express");
const cartRouter=express.Router();
const verify =require("../middlewares/userAuthentication")
const {addToCart, removeFromCart, getCart, totalCart}=require("../controllers/cartController")
cartRouter.post("/addtocart",verify, addToCart)
cartRouter.post("/removefromcart",verify, removeFromCart)
cartRouter.get("/getcart",verify, getCart)
cartRouter.post("/totalcart", verify,totalCart )



module.exports=cartRouter;