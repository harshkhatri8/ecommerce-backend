import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncError from "../middleware/catchAsyncError.js"
import User from "../models/usermodel.js"
import sendToken from "../utils/jwtToken.js"
import sendEmail from "../utils/sendEmail.js"


const registerUser = catchAsyncError(async (req,res,next)=>{
    const {name,email,password} = req.body

    const user = await User.create({name,email,password,
        avatar:{
            public_id:"this is a sample id ",
            url:"profilepicUrl"
        }
    }
    )


    sendToken(user,201,res)
})


//Login user

const loginUser = catchAsyncError(async(req,res,next)=>{
    const{email,password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and password",400))

    }
    const user = await User.findOne({email:email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invailid Email or Password",401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invailid Email or Password",401))
    }



    sendToken(user,200,res)



})

//logout user
const logout = catchAsyncError(async (req,res,next)=>{

    res.cookie("token",null,{
        expire: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})



const forgotPassword = catchAsyncError(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("user not found",404))
    }

    const resetToken = user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, please ignore it`
    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        })

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`
        })


    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
         await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }
})


export {registerUser,loginUser,logout,forgotPassword}