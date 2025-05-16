import express from 'express'
import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../Controllers/product.controller.js';

const productRouter=express.Router();

productRouter.post("/add",addProduct)
productRouter.get("/get",getProducts)
productRouter.get("/:id",getProductById)
productRouter.put("/:id",updateProductById)
productRouter.put("/:id",deleteProductById)
export default productRouter