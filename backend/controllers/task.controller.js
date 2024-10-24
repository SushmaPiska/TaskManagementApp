import Task from "../models/task.model.js";
import mongoose from "mongoose";
import { isAuth } from "../utils/isAuth.js";

export const createTask = async (req, res) => {
  try {
    const { title, priority, assignee, checkList, dueDate } = req.body;

    const assigneeId = mongoose.Types.ObjectId.isValid(assignee)
      ? mongoose.Types.ObjectId(assignee)
      : null;

    const task = new Task({
      title,
      priority,
      assignee: assigneeId,
      checkList,
      dueDate,
    });
    await task.save();

    res.status(200).json({ message: "Task created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Task not created" });
  }
};
export const getAllTasks = async (req, res) => {
  const isAuthenticated = isAuth(req);
  console.log(isAuthenticated);
  const tasks = isAuthenticated
    ? await Task.find()
    : await Task.find().select("-_id -__v ");
  res.status(200).json(tasks);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  console.log(task);
  if (!task) {
    return res.status(401).json({ message: "Task not found" });
  }
  await Task.findByIdAndDelete(id);
  res.status(200).json({ message: "Task deleted  successfully" });
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, assignee, checkList, dueDate } = req.body;

    console.log(req.user)
    const assigneeId = mongoose.Types.ObjectId.isValid(assignee)
      ? mongoose.Types.ObjectId(assignee)
      : null;

    let task = await Task.findById(id);
    console.log(task)
      if(!task){
        return  res.status(400).json({message:"Job not found"})
      }
     task = await Task.findByIdAndUpdate(id, { title, priority, assignee:assigneeId, checkList, dueDate },{new:true});

    res.status(200).json(task)
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Task not updated"})
  }
};
