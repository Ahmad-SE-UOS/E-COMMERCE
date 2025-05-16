import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
export const register=async(req,res)=>{
    const {name,email,password}=req.body;

    try {
        let user=await User.findOne({email})
        if(user)
            return res.json({message:"User already exist",success:false})
        let hashedPass=await bcrypt.hash(password,10)

        user=await User.create({name,email,password:hashedPass});
        res.json({message:'User registered successfully..!',
            user,
            success:true
        })
        
    } catch (error) {
        res.json({
            message:error.message
        })
        
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;

    try {
        let user=await User.findOne({email})
        if(!user)
            return res.json({message:"User not found",success:false})
        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword)
            return res.json({message:"Invalid credentials",success:false})
        res.json({message:`Welcome ${user.name}`,success:true,user})
    } catch (error) {
         res.json({message:error.message})
        
    }
}
export const users=async(req,res)=>{
    try {
        let users=await User.find().sort({createdAt:-1})
        res.json(users)
        
    } catch (error) {
        res.json({error:error.message})
    }
}