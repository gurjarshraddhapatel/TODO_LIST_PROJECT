import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        fullName:{
            type:String
        },
        email:{
            type:String
        },
        password:{
            type:String 
        },
        refreshToken:{
            type:String
        }
    },
    {timestamps:true})

    userSchema.pre("save",async function(next) {
        if(!this.isModified("password"))return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    })

    userSchema.methods.isPasswordCorrect = async function(password)
    {
        return await bcrypt.compare(password,this.password);
    }

    userSchema.methods.generateAccessToken = function(){
        return jwt.sign({
            _id:this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRE}
    )}

    userSchema.methods.generateRefreshToken = function(){
        return jwt.sign({
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRE}
    )}

export const User = mongoose.model("User",userSchema)