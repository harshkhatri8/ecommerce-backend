import express from 'express'
import {forgotPassword, loginUser, logout, registerUser} from '../controllers/userController.js'
const router = express.Router()

router.post('/register',registerUser)

router.post('/login',loginUser)
router.get('/logout',logout)
router.post("/password/forgot",forgotPassword)

export default router