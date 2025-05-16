import express from 'express'
import { login, register, users } from '../Controllers/user.controller.js';


const router=express.Router();

router.post("/register",register)

router.post("/login",login)

router.get("/all",users)

export default router;