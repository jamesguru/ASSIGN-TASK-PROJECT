import express, { Router } from 'express';
import { registerDeveloper } from '../Controllers/Auth';


const router = Router();



router.post('/register',registerDeveloper)





export default router;