import {Router} from 'express'
import { assignTaskToDeveloper, getAllDevelopers } from '../Controllers/Developer';


const router = Router();


router.get("/",getAllDevelopers);
router.put("/:id",assignTaskToDeveloper)





export default router;