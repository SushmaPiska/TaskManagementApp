import express from "express"

import { 
    // getUserbyEmail,
     login, logout, signup, 
     updateUserEmail, 
     updateUserName,
     updateUserPassword} from "../controllers/user.controller.js"

import signupValidation from  "../middlewares/signupValidation.js"

const router=express.Router()

router.post("/signup",signupValidation,signup)
router.post("/login",login)
router.post("/logout",logout)
// router.get("/:email",getUserbyEmail)

router.put('/updateUserName/:id',updateUserName)
router.put('/updateUserEmail/:id',updateUserEmail)
router.put('/updateUserPassword/:id',updateUserPassword)

export default router