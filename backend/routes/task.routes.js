import express from 'express';
import { createTask,searchUsers, deleteOneTypeTasks, getAllTasksByType, getTaskById, getTasksByPriority } from '../controllers/task.controller.js';
import  authorization  from '../middlewares/authorization.js';

import { deleteTask } from '../controllers/task.controller.js';
import { updateTask } from '../controllers/task.controller.js';
import { updateTaskType } from '../controllers/task.controller.js';


const router=express.Router();

router.post('/createTask',
    // authorization,
    createTask)
router.get('/searchUsers',searchUsers)
router.get('/getTaskById/:id',getTaskById)

router.post('/getAllTasksByType',getAllTasksByType)

router.delete("/delete/:id",
    // authorization,
    deleteTask)
router.put('/update/:id',
    // authorization,
    updateTask)
router.put('/updateTaskType/:id',
    // authorization,
    updateTaskType)
router.delete('/deleteOneTypeTasks',deleteOneTypeTasks)

router.post('/getTasksByPriority',getTasksByPriority)



export default router