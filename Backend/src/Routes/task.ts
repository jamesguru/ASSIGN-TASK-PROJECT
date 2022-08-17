import {Router} from 'express';

import {getAllTasks,getTasksForDeveloper,updateTask,deleteTask,addTask,assignTask, unassignTask} from '../Controllers/Task';
import { VerifyToken } from '../Middlewares/Verifytoken';


const router = Router();

router.get("/",VerifyToken, getAllTasks)

router.get("/assigned/:id",VerifyToken,getTasksForDeveloper)

router.put("/assign/:id",VerifyToken, assignTask)

router.put("/unassign/:id",VerifyToken, unassignTask)

router.put("/:id",VerifyToken, updateTask)

router.delete("/:id",VerifyToken, deleteTask)

router.post("/",VerifyToken, addTask);



export default router;