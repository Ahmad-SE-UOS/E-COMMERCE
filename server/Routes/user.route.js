import express from 'express'
import { login, profile, register, users } from '../Controllers/user.controller.js';
import { Authenticates } from '../Middleware/auth.js';

const router=express.Router();

router.post("/register",register)

router.post("/login",login)

router.get("/all",users)

router.get("/profile",Authenticates,profile)
export default router;