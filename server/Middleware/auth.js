  import jwt from 'jsonwebtoken'
  import { User } from '../Models/user.model.js'
  export const Authenticates=async(req,res,next)=>{
    const token=req.header("Auth")

    if(!token) return res.json({message:"Login first"})
    
   const decoded=jwt.verify(token,"1#2@#$#@@")
   const id=decoded.userId

   let user=await User.findById(id);
   if(!user) return res.json({message:"user not exist"})

   req.user=user
   next();
  }