import User from "../models/usermodel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js"
import jwt from 'jsonwebtoken'
const isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{

    const {token} = req.cookies;
    
    if(!token){
        return next(ErrorHandler("Please login to access Resource"),401);
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id)
    
    next()

})

const authorizeRoles = (...roles) => {
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
}
export { isAuthenticatedUser, authorizeRoles}