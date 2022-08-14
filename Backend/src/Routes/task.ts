import {Router} from 'express';

import {getAllTasks,getTasksForDeveloper,updateTask,deleteTask,addTask,assignTask} from '../Controllers/Task';


const router = Router();

router.get("/",getAllTasks)

router.get("/assigned/:id",getTasksForDeveloper)

router.put("/assign/:id",assignTask)

router.put("/:id",updateTask)

router.delete("/:id",deleteTask)

router.post("/",addTask)



export default router;