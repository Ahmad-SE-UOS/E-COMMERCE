import { Address } from "../Models/address.model";

export const addAddress=async(req,res)=>{
    let {fullname,address,city,state,country,pincode,phoneNumber}=req.body;

    let userAddress=await Address.create({
        userId:req.user,
        fullname,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
    })
    res.json({message:'Address added',userAddress})
}

export const getAddress=async(req,res)=>{
    let address=await Address.find({userId:req.user}).sort({createdAt:-1});
    res.json({message:"Address",userAddress:Address[0]})
}