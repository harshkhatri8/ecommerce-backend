import productModel from "../models/productModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncError from "../middleware/catchAsyncError.js"

import ApiFeatures from "../middleware/apiFeatures.js"
//create product --admin
const createProduct = catchAsyncError(
    async(req,res,next)=>{
        
        req.body.user = req.user.id;
        const product = await productModel.create(req.body)
    
        res.status(200).json({
            success:true,
            product
        })
    }
)

const updateProduct = catchAsyncError(
    async(req,res)=>{
        let product = await productModel.findById(req.params.id)
        if(!product){
            return res.status(500).json({
                success:false,
                massage:"product not found"
            })
        }
        
            product = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
            res.status(200).json({
                success:true,
                product
            })
        
    }
)
const deleteProduct = catchAsyncError(
    async(req,res)=>{

        const product = await productModel.findById(req.params.id)
        
        if(!product){
            return res.status(500).json({
            success:false,
            massage:"product not found"
            })
        }
        
    
    
            await product.remove()
            res.status(200).json({
                success:true,
                massage:"product delte successfully",
            })
        
    }
    
)

const getAllProduct = catchAsyncError(async(req,res)=>{
    const resultPerPage = 10;
    
    const productCount = await productModel.countDocuments()
    const apiFeatures = new ApiFeatures(productModel.find(),req.query).search().filter().pagination(resultPerPage);
    const result = await apiFeatures.query
    res.status(200).json({
     success:true,
     result
    })
 })

const getProductDetail = catchAsyncError(async (req,res,next)=>{
    const product = await productModel.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    res.status(200).json({
        success:true,
        product,
        productCount
    })

})

export {getAllProduct,createProduct,updateProduct,deleteProduct,getProductDetail}
