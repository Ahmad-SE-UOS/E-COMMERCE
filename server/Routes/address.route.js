import express from 'express'
import { addAddress } from '../Controllers/address.controller.js'
import { Authenticates } from '../Middleware/auth.js'

export const addressRouter=express.Router()

addressRouter.post("/add-address",Authenticates,addAddress)

addressRouter.get("/get-address",Authenticates,addAddress)