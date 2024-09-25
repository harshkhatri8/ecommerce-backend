import express from 'express'
import dbConnect from './config/dbConnect.js'
import productRoute from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'
import { configDotenv } from 'dotenv'
import error from './middleware/error.js'
import cookieParser from 'cookie-parser'

configDotenv()
const app = express()
const DB_URL = process.env.DB_URL



app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/',productRoute)
app.use('/api/v1/',userRoutes)

app.use(error)

app.get('/',(req,res)=>{
    res.send("hhh")
})





dbConnect(DB_URL)
export default app;