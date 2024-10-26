import express from 'express';
import { createTask } from '../controllers/task.controller.js';
import  authorization  from '../middlewares/authorization.js';

import { deleteTask } from '../controllers/task.controller.js';
import { updateTask } from '../controllers/task.controller.js';
import { getAllBacklogTasks } from '../controllers/task.controller.js';
import { getAllToDoTasks } from '../controllers/task.controller.js';
import { getAllInProgressTasks } from '../controllers/task.controller.js';
import { getAllDoneTasks } from '../controllers/task.controller.js';

const router=express.Router();

router.post('/createTask',
    // authorization,
    createTask)

router.get('/getAllBacklogTasks',getAllBacklogTasks)
router.get('/getAllToDoTasks',getAllToDoTasks)
router.get('/getAllInProgressTasks',getAllInProgressTasks)
router.get('/getAllDoneTasks',getAllDoneTasks)

router.delete("/delete/:id",authorization,deleteTask)
router.put('/update/:id',authorization,updateTask)
export default router