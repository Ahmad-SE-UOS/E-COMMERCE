import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
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

        const token=jwt.sign({userId:user._id},"1#2@#$#@@",{
            expiresIn:'365d'
        })
        res.json({message:`Welcome ${user.name}`,token,success:true})
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

// user profile

export const profile=async(req,res)=>{
    res.json({user:req.user});
}