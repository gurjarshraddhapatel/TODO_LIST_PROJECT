import { User } from "../Model/user.model.js"
import jwt from "jsonwebtoken"
 
export const verifyJWT = async(req,res,next)=>{
  
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    console.log(token);
    if(!token)
    {
        return res.status(401).json({message:"Unauthorized request"})
    }

    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    let user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    if(!user)
    {
        return res.status(401).json({message:"Invalid token"})
    }

    req.user = user;
    next()
}