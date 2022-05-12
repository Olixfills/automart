import express from 'express'
import { getAllUsers, loginUser, signupUser } from '../controllers/user-controller.js';


const router = express.Router();


router.get('/', getAllUsers)
router.post('/signup',signupUser)
router.post('/login',loginUser)




export default router;