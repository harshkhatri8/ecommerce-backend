import mongoose from "mongoose";

const dbConnect = async(DB_URL)=>{
 
    mongoose.connect(DB_URL)
    .then((req,res)=>{
        console.log("DataBase connected successfully at " + DB_URL );
        
    })


}

export default dbConnect