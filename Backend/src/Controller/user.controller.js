import asynchandler from "../middleware/asyncHandler.js";
import { User } from "../Model/user.model.js";

const generateAccessAndRefreshToken = async(userId)=>{
    try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
  
      user.refreshToken = refreshToken;
      await user.save({validateBeforeSave:false})
      return {accessToken,refreshToken}
    } catch (error) {
         console.log(error);
    }
 }

const register = asynchandler(async(req,res)=>{
    const {fullName,password,email} = req.body 

    const user = await User.insertOne({
        fullName,
        password,
        email
    })
    if(!user)
    {
        return res.status(400).json({message:"user not creatd"})
    }

    return res
    .status(201)
    .json({user,message:"User created successfully"})

})

const login = async(req,res)=>{
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message:"All fields are required"})
    }

    const user = await User.findOne({email}).select("-refreshToken");
    if (!user) {
        return res.status(404).json({message:"User or role not found"})
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {

        return res.status(400).json({message:"Invalid credentials"})
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        secure: true,
        httpOnly: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ user: loggedInUser, accessToken, refreshToken,message:"User logged in successfully" })
}

const getCurrentUser = async(req,res)=>{
    return res
    .status(200)
    .json({user:req.user,message:"User retrived successfully"})
}

const logout = async(req,res)=>{
    await User.findByIdAndUpdate(req.user?._id,
        {
          $unset:{refreshToken:1}
        },
        {
          new: true
        })
    
        const options = {
          httpOnly:true,
          secure:true
        }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({message:"User logout successfully"})
}

export{
    register,
    login,
    getCurrentUser,
    logout
}