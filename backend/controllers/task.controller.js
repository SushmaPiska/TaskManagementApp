import Task from "../models/task.model.js";
import mongoose from "mongoose";
import { isAuth } from "../utils/isAuth.js";

export const createTask = async (req, res) => {
  try {
    const { title, priority, assignee, checkList, dueDate, taskType } =
      req.body;

    const assigneeId = mongoose.Types.ObjectId.isValid(assignee)
      ? mongoose.Types.ObjectId(assignee)
      : null;

    const task = new Task({
      title,
      priority,
      assignee: assigneeId,
      checkList,
      dueDate,
      taskType,
    });
    await task.save();

    res.status(200).json({ message: "Task created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Task not created" });
  }
};

export const getAllBacklogTasks = async (req, res) => {
  try {
    const isAuthenticated = isAuth(req);
    const tasks= await Task.find({ taskType: "backlog" })

  // const tasks = isAuthenticated
  //   ? await Task.find({ taskType: "backlog" })
  //   : await Task.find({ taskType: "backlog" }).select("-_id -__v ");
  res.status(200).json(tasks);
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Unable to get all  backlog tasks"})
  }
};
export const getAllToDoTasks = async (req, res) => {
  try {
    const isAuthenticated = isAuth(req);

    const tasks=await Task.find({ taskType: "toDo" });
  // const tasks = isAuthenticated
  //   ? await Task.find({ taskType: "toDo" })
  //   : await Task.find({ taskType: "toDo" }).select("-_id -__v ");
  res.status(200).json(tasks);
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Unable to get all  todo tasks"})
  }
};
export const getAllInProgressTasks = async (req, res) => {
  try {
    const isAuthenticated = isAuth(req);
    const tasks=await Task.find({ taskType: "inProgress" })

  // const tasks = isAuthenticated
  //   ? await Task.find({ taskType: "inProgress" })
  //   : await Task.find({ taskType: "inProgress" }).select("-_id -__v ");
  res.status(200).json(tasks);
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Unable to get all in progress tasks"})
  }
};
export const getAllDoneTasks = async (req, res) => {
  try {
    const isAuthenticated = isAuth(req);

    const tasks=await Task.find({"taskType":"done"})
  // const tasks = isAuthenticated
  //   ? await Task.find({ taskType: "done" })
  //   : await Task.find({ taskType: "done" }).select("-_id -__v ");
  res.status(200).json(tasks);
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Unable to get all  done tasks"})

  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return res.status(401).json({ message: "Task not found" });
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted  successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Task not deleted" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, assignee, checkList, dueDate } = req.body;

    console.log(req.user);
    const assigneeId = mongoose.Types.ObjectId.isValid(assignee)
      ? mongoose.Types.ObjectId(assignee)
      : null;

    let task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return res.status(400).json({ message: "Job not found" });
    }
    task = await Task.findByIdAndUpdate(
      id,
      { title, priority, assignee: assigneeId, checkList, dueDate },
      { new: true }
    );

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Task not updated" });
  }
};

export const updateTaskType = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskType} = req.body;

    console.log(id);
    

    let task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return res.status(400).json({ message: "Job not found" });
    }
    task = await Task.findByIdAndUpdate(
      id,
      { taskType },
      { new: true }
    );

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Task not updated" });
  }
}

export const deleteOneTypeTasks=async(req,res)=>{
  try {
    const {taskType}=req.body
    const result = await Task.deleteMany({ taskType: taskType });
    res.status(200).json({ message: 'Tasks deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting tasks' });
  }
}

