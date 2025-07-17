import { Products } from "../Models/product.model.js";

// add user
export const addProduct=async(req,res)=>{
    const {title,description,price,category,qty,imageSrc,createdAt}=req.body;
    try {
        let product=await Products.create({
            title,description,price,category,qty,imageSrc,createdAt
        })
       
        res.json({message:"Product added successfully",product})
    } catch (error) {
        res.json(error.message)
    }
} 

//get product
export const getProducts=async(req,res)=>{
    let products=await Products.find().sort({createdAt:-1});
    res.json({message:"All products",products})
}

//get product by id
export const getProductById=async(req,res)=>{
    const id=req.params.id;
    let products=await Products.findById(id)
    if(!products) res.json({message:'Invalid Id'})
    res.json({meaage:"Specific Product",products})
}

//update product by id
export const updateProductById=async(req,res)=>{
    const id=req.params.id;
    let products=await Products.findByIdAndUpdate(id,req.body,{new:true})
    if(!products) res.json({message:'Invalid Id'})
    res.json({meaage:"Product has been updated",products})
}
//delete product by id
export const deleteProductById=async(req,res)=>{
    const id=req.params.id;
    let products=await Products.findByIdAndDelete(id)
    if(!products) res.json({message:'Invalid Id'})
    res.json({meaage:"Product has been delelted",products})
}