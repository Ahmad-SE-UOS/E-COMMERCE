import { Cart } from "../Models/cart.model.js";

//add to cart
export const addToCart=async(req,res)=>{
    const {productId,title,description,price,qty,imageSrc}=req.body;
    const userId=req.user;
    
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
    const userId=req.user;
    
    let cart=await Cart.findOne({userId});
    if(!cart) res.json({message:"NO cart found"})
    
    res.json({message:"user cart",cart})
}
//remove user cart
export const removeCartItem=async(req,res)=>{
    const productId=req.params.productId;
    const userId=req.user;
    
    let cart=await Cart.findOne({userId});
    if(!cart) res.json({message:"NO cart found"})
    
    cart.items=cart.items.filter((item)=>item.productId.toString()!==productId)
    await cart.save()
    res.json({message:"Item deleted from cart successully"})
}

// clear cart
export const clearCart=async(req,res)=>{
    
    const userId=req.user;
    
    let cart=await Cart.findOne({userId});
    if(!cart){
        cart=new Cart({items:[]})
    }
    else{
        cart.items=[];
    }
    
    await cart.save()
    res.json({message:"Cart clear successfully"})
}

// delete qty from cart
export const decreaseProductQty=async(req,res)=>{
    const {productId,qty}=req.body;
    const userId=req.user
    
    let cart=await Cart.findOne({userId});
    if(!cart){
        cart=new Cart({userId,items:[]})
    }
    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)

    if(itemIndex>-1){
        const item=cart.items[itemIndex]
        if(item.qty>qty){
            const pricePerunit=item.price/item.qty
            item.qty-=qty
            item.price-=pricePerunit*qty
        }
        else{
            cart.items.splice(itemIndex,1)
        }
    }
    else{
       return res.json({message:'Invalid user id'})

    }
    await cart.save();
    res.json({message:"Items quantity decreased",cart})

}
