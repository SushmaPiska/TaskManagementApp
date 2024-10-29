import axios from "axios";
import { addTokenToHeader } from "../helper/addToken";

export const getAllTasksByType = (taskType) => {
  const tasks = axios.post("http://localhost:8000/api/auth/getAllTasksByType", {
    taskType: taskType,
  });
  return tasks;
};

export const getTasksByPriority = (priority ) => {
  const tasks = axios.post(
    "http://localhost:8000/api/auth/getTasksByPriority",
    {
      priority: priority,
    }
  );
  return tasks;

  // const tasks=axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/getTasksByPriority`,{priority:priority})
};
