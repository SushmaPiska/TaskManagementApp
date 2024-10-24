import express from 'express';
import { createTask } from '../controllers/task.controller.js';
import  authorization  from '../middlewares/authorization.js';
import { getAllTasks } from '../controllers/task.controller.js';
import { deleteTask } from '../controllers/task.controller.js';
import { updateTask } from '../controllers/task.controller.js';

const router=express.Router();

router.post('/createTask',authorization,createTask)
router.get('/',getAllTasks)
router.delete("/delete/:id",authorization,deleteTask)
router.put('/update/:id',authorization,updateTask)
export default router