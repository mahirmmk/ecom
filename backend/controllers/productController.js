
const product=require("../models/productModel");
require("../routes/productRoutes");






exports.postProduct=(req,res)=>{
    const url=req.protocol +'://'+req.get("host");
    const{title,cat,price,desc}=req.body;
    const userID=req.userData.userID
       
    product.create({title:title, cat:cat, desc:desc, price:price,
        image:url+'/images/'+req.file.filename, createdby:userID}).then(res.json({
        dataCreated:req.body,
        createdby:userID,
        message:"YOUR DATA HAS BEEN UPDATED SUCCESSFULLY",
        
    }).status(201)).catch(err=>{
        res.status(505).json({
            message:"An error occured",
            success:false
        })
    } )
}

exports.getProducts=(req, res)=>{
    product.find().then(data=>{
        res.status(200).json({
            success:true,
            rdata:data
            
        });
    }).catch(error => {
        res.status(505).json({
            message: error,
            success: false
        })
    })
}
exports.editProduct=(req, res)=>{
    
    const id=req.params.id;
    product.findById(id).then(data=>res.status(202).json(data)).catch(err=>{
        res.status(505).json({
            message: error,
            success: false
        }) 
    })


}

exports.patchProduct=(req, res)=>{
    const userID=req.userData.userID
    const id=req.params.id;
    const url=req.protocol +'://'+req.get("host");
    const{title,cat,price,desc}=req.body;
    product.findByIdAndUpdate({_id:id}, {title:title, cat:cat, desc:desc, price:price, createdby:userID}).then(res.json({
        updatedData:req.body,
        message:"YOUR DATA HAS BEEN UPDATED SUCCESSFULLY"
    
    }).status(201)).catch(err=> {
        res.status(505).json({
            message: error,
            success: false
        })
    })
}

exports.deleteProduct=(req, res)=>{
   
    const id=req.params.id;
    product.findByIdAndDelete(id).then(message=>{
        res.json({
            messag:"your data has been deleted",
            data:message
        }).status(200)
    }).catch(err=>{
        console.log(err);
        res.status(410).json({

            message:"not found with the given parameters",
            data:err
        })
        
    })
}
exports.addToCart=(req, res)=>{
    const id= req.body._id;
    const user=req.body.userID;

    console.log(id, user)
}