const express=require("express");
const productRouter=express.Router();
const verify =require("../middlewares/userAuthentication")
const pController=require("../controllers/productController")
const imageHandler=require("../middlewares/imageFile")
productRouter.get("/getProducts", pController.getProducts);
productRouter.post("/postProduct",verify,imageHandler,pController.postProduct);
productRouter.get("/editProduct/:id",verify, pController.editProduct);
productRouter.patch("/patchProduct/:id",verify,pController.patchProduct);
productRouter.delete("/deleteProduct/:id",verify, pController.deleteProduct);
productRouter.get("/cart", pController.addToCart)


module.exports=productRouter;