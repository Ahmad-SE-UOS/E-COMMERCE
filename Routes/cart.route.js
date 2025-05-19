import express from 'express'
import { addToCart, clearCart, decreaseProductQty, getUserCart, removeCartItem } from '../Controllers/cart.controller.js';
import { Authenticates } from '../Middleware/auth.js';

export const cartRouter=express.Router();

// add to cart
cartRouter.post("/add",Authenticates,addToCart)

// get user cart
cartRouter.get("/get-cart",Authenticates,getUserCart)

// remove cart item
cartRouter.delete("/remove/:productId",Authenticates,removeCartItem)

// clear cart
cartRouter.delete("/clear",Authenticates,clearCart)

// decrease qty
cartRouter.post("/--qty",Authenticates,decreaseProductQty)
