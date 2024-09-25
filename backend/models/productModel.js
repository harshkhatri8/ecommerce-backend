import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"PLease enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"PLease enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"enter product Price"],
        maxLength:[8,"price cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter product stock"],
        maxLength:[4,"stock cannot exceed 4 characters"],
        default:1

    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true,
            }

        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAT:{
        type:Date,
        default:Date.now()
    }
})


const productModel = mongoose.model("Product",productSchema)
export default productModel