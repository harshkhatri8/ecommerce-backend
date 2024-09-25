import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config()
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("server closing due to uncaught");

    process.exit(1)
    
    
})
const PORT = process.env.PORT|| 3000


const server = app.listen(PORT,(req,res)=>{
    console.log(`server started at ${PORT}`)
})

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("server closing due to unhandled rejection");
    

    server.close(()=>{
        process.exit(1)
    })
    
})
