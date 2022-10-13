const cors = require ("cors");
const express=require("express");
const app=express();
app.use(express.json());
require("dotenv").config()
const port=process.env.PORT;
require("./utilities/productDb");
const path=require("path")

const productRouter=require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const cartRouter=require("./routes/cartRoutes")
app.use(cors());
app.use("/product" ,productRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter)
app.use("/images", express.static(path.join('images')))


app.listen(`${port}`, ()=> console.log("the server is listening at localhost/"+ port));
