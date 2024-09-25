import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed maximum limit"],
        minLength:[4,"Name should have more than 4 character"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please enter valid Email"]
    },
    password:{
        type:String,
        required:true,
        minLenght:[8,"Password should be greater than or equals to 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
})
userschema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})


//JWT Token

userschema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRE
        }
    )
}

userschema.methods.comparePassword = async function(ePassword){
    return await bcrypt.compare(ePassword,this.password)
}

userschema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString("hex") 

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() * 15 *60 * 1000;

    return resetToken
}


const user = mongoose.model("User",userschema)
export default user