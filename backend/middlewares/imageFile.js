const multer=require("multer");

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}
const storage=multer.diskStorage({
    destination:(req, file, callback)=> {
        let isValid=MIME_TYPE_MAP[file.mimetype]
        let error=new Error("invalid file type")
        if(isValid){
            error=null
        }
        callback(error, "images")
    },
    filename:(req, file, callback)=>{
       const name=file.originalname.toLocaleLowerCase().split(" ").join("_")
       const ext=MIME_TYPE_MAP[file.mimetype];
       callback(null, Date.now()+name+"."+ext) 

    }

    
})
module.exports=multer({storage:storage}).single('image')