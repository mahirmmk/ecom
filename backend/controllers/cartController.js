const express=require("express");
const { default: mongoose } = require("mongoose");
require("../models/cartModel");
const Cart = require("../models/cartModel");
const product=require("../models/productModel");

exports.addToCart=async (req, res, next)=>{
    try{
        const {productId, quantity, price}=req.body;
        const {userID}=req.userData;
        const products=await product.findOne({_id:productId});
        
        products.isAddedToCart=!products.isAddedToCart;
        let response=await products.save();
        const alreadyAdded= await Cart.findOne({productId:productId});
        if(alreadyAdded){
            return res.status(201).json({
                message:"product already exists in cart"
            })
        }else{
            const cart=await Cart.create({userId:userID,quantity, price , productId })
            return res.status(201).json({
                message:"product added to the cart",
                success:true
            })
        }



    }catch(error){
        console.log(error);
        return res.status(505).json({
            message:"something went wrong, please contact your service provider"
        })
    }
}

exports.getCart= async(req, res)=>{
    try{
        // yaha pr userid me error ho sakti he
        const cartData=await Cart.find({userId:req.userData.userID}).populate(['userId', 'productId']);
        res.status(200).json({
            message:"data fetched",
            success:true,
            cart:cartData
        })

    }catch(error){
        console.log(error);
        res.status(505).json({
            message:"error occured, could not fet the cart data",
            succes:false
        })
    }
}
exports.removeFromCart=async (req, res)=>{
    try{
        const {productId}= req.body;                      
        await product.updateOne({_id:productId}, {isAddedToCart:false})
        await Cart.deleteOne({productId:productId});               
        return res.status(201).json({
            message:"product deleted from the cart succesfully",
            success :true
        })

    }catch(error){
        console.log(error+ "error in removefromcart")
        res.status(505).json({
            message:"could not remove from cart, error occured in api",
            success:false
        })
    }
}

exports.totalCart=async(req, res)=>{
    try{
        const count=await Cart.find({userId:req.userData.userID}).countDocuments();
        res.status(200).json({
            message:"count fetched",
            count:count
        })

    }catch(error){
        console.log("error in totalCart function", error)
        res.status(505).json({
            message:"error occured, could not get totalCart value",
            succes:false
        })
    }
}