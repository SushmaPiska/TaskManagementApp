import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Board from "./components/Board";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";

import { getAllTasksByType } from "../services/getAllTasks";
import TaskDetails from "./pages/TaskDetails";
import SharedTask from "./components/SharedTask.jsx";

function App() {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isTaskCreated, setIsTaskCreated] = useState(false);
  const [isTaskDeleted, setIsTaskDeleted] = useState(false);



  useEffect(() => {
   
      Promise.all([
        getAllTasksByType("backlog").then(res => setBacklogTasks(res.data)),
        getAllTasksByType("toDo").then(res => setToDoTasks(res.data)),
        getAllTasksByType("inProgress").then(res => setInProgressTasks(res.data)),
        getAllTasksByType("done").then(res => setDoneTasks(res.data))
      ]).catch(e => console.log("Error:", e))
      .finally(() => {
        setIsTaskCreated(false)
        setIsTaskDeleted(false)
      });
    
  }, [isTaskCreated,isTaskDeleted]);

  const addTask = (newTask) => {
    switch (newTask?.taskType) {
      case "backlog":
        setBacklogTasks((prevTasks) => [...prevTasks, newTask]);
        break;
      case "toDo":
        setToDoTasks((prevTasks) => [...prevTasks, newTask]);
      
        break;
      case "inProgress":
        setInProgressTasks((prevTasks) => [...prevTasks, newTask]);
        break;
      case "done":
        setDoneTasks((prevTasks) => [...prevTasks, newTask]);
        break;
      default:
        break;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            index
            element={
              <Board
                backlogTasks={backlogTasks}
                toDoTasks={toDoTasks}
                inProgressTasks={inProgressTasks}
                doneTasks={doneTasks}
                setToDoTasks={setToDoTasks}
                addTask={addTask}
                setIsTaskCreated={setIsTaskCreated}
                setIsTaskDeleted={setIsTaskDeleted}
                
              />
            }
          ></Route>
          <Route
            path="analytics"
            element={
              <Analytics
                backlogTasks={backlogTasks}
                toDoTasks={toDoTasks}
                inProgressTasks={inProgressTasks}
                doneTasks={doneTasks}
              />
            }
          ></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
        <Route path="/taskDetails" element={<TaskDetails />}>
          <Route path=":id" element={<SharedTask />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
