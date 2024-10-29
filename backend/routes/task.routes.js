import express from 'express';
import { createTask, deleteOneTypeTasks, getAllTasksByType, getTaskById, getTasksByPriority } from '../controllers/task.controller.js';
import  authorization  from '../middlewares/authorization.js';

import { deleteTask } from '../controllers/task.controller.js';
import { updateTask } from '../controllers/task.controller.js';
import { getAllBacklogTasks } from '../controllers/task.controller.js';
import { getAllToDoTasks } from '../controllers/task.controller.js';
import { getAllInProgressTasks } from '../controllers/task.controller.js';
import { getAllDoneTasks } from '../controllers/task.controller.js';
import { updateTaskType } from '../controllers/task.controller.js';


const router=express.Router();

router.post('/createTask',
    // authorization,
    createTask)
router.get('/getTaskById/:id',getTaskById)
router.get('/getAllBacklogTasks',getAllBacklogTasks)
router.get('/getAllToDoTasks',getAllToDoTasks)
router.get('/getAllInProgressTasks',getAllInProgressTasks)
router.get('/getAllDoneTasks',getAllDoneTasks)
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