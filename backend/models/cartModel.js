const monsgoose=require("mongoose");
const cartSchema=monsgoose.Schema({
    userId:{
    type:monsgoose.Schema.Types.ObjectId,
    ref: "userData",
    required:true},
    productId:{
    type:monsgoose.Schema.Types.ObjectId,
    ref:"product"
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true
    }
}, {timestamps:true}
)
let Cart=monsgoose.model("cart", cartSchema)
module.exports=Cart;
