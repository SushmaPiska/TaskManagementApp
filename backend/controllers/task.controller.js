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

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task data" });
  }
};

export const getAllTasksByType = async (req, res) => {
  try {
    const isAuthenticated = isAuth(req);
    const {taskType}=req.body
    const tasks= await Task.find({ taskType: taskType })
    // const tasks = isAuthenticated
    //   ? await Task.find({ taskType: taskType })
    //   : await Task.find({ taskType: taskType }).select("-_id -__v ");
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Unable to get all tasks` });
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
    const { taskType } = req.body;

    let task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return res.status(400).json({ message: "Job not found" });
    }
    task = await Task.findByIdAndUpdate(id, { taskType }, { new: true });

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Task not updated" });
  }
};

export const deleteOneTypeTasks = async (req, res) => {
  try {
    const { taskType } = req.body;
    const result = await Task.deleteMany({ taskType: taskType });
    res
      .status(200)
      .json({
        message: "Tasks deleted successfully",
        deletedCount: result.deletedCount,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting tasks" });
  }
};

export const getTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    const result = await Task.find({ priority: priority });
    res.status(200).json(result.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};
