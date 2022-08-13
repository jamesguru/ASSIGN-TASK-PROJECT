import express, { Router } from 'express';
import { register,login } from '../Controllers/Auth';


const router = Router();



router.post('/register',register)
router.post('/login',login)




export default router;