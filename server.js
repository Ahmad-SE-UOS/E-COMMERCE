import express from 'express'
import mongoose from 'mongoose'
import router from './Routes/user.route.js '
import bodyParser from 'express'
import productRouter from './Routes/product.route.js'
import { cartRouter } from './Routes/cart.route.js'
import { addressRouter } from './Routes/address.route.js'

const app=express()
app.use(express.json())
app.use("/api/user",router)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api-address",addressRouter)

mongoose.connect(
    "mongodb+srv://rajpootahmad3031:ekY3bZSk5rcs4nh5@cluster0.f3d611d.mongodb.net/MERN_E_COMMERCE?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection Error:", err));
4  

const port=2000
app.listen(port,()=>console.log(`Server running on port ${port}`))