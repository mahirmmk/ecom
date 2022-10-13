const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    title:{type:String, required:true},
    cat:{type:String, required:true},
    price:{type:String, required:true},
    desc:{type:String, required:true},
    image:{type:String, required:false},
    isAddedToCart:{type:Boolean, default:false},
    createdby:{type:String, required:true}
},{timestamps:true});
const products=mongoose.model("product", productSchema);
module.exports=products;