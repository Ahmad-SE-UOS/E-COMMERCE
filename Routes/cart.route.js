import express from 'express'
import { addToCart, getUserCart } from '../Controllers/cart.controller.js';


export const cartRouter=express.Router();

// add to cart
cartRouter.post("/add",addToCart)

// get user cart
cartRouter.get("/get-cart",getUserCart)

