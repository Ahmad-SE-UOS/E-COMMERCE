import { Cart } from "../Models/cart.model.js";

//add to cart
export const addToCart=async(req,res)=>{
    const {productId,title,description,price,qty,imageSrc}=req.body;
    const userId="682545479c080c226c5cd01a";
    
    let cart=await Cart.findOne({userId});
    if(!cart){
        cart=new Cart({userId,items:[]})
    }
    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)

    if(itemIndex>-1){
        cart.items[itemIndex].qty+=qty;
        cart.items[itemIndex].price +=price*qty;
    }
    else{
        cart.items.push({productId,title,description,price,qty,imageSrc})

    }
    await cart.save();
    res.json({message:"Items added to cart",cart})

}


//get user cart

export const getUserCart=async(req,res)=>{
    const userId="682545479c080c226c5cd01a";
    
    let cart=await Cart.findOne({userId});
    if(!cart) res.json({message:"NO cart found"})
    
    res.json({message:"user cart",cart})
}