import express from "express"

import { 
    // getUserbyEmail,
     login, logout, signup } from "../controllers/user.controller.js"

import signupValidation from  "../middlewares/signupValidation.js"

const router=express.Router()

router.post("/signup",signupValidation,signup)
router.post("/login",login)
router.post("/logout",logout)
// router.get("/:email",getUserbyEmail)

export default router