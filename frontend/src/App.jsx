import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Board from "./components/Board";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";

import { getAllBacklogTasks } from "../services/getAllTasks";
import { getAllToDoTasks } from "../services/getAllTasks.js";
import { getAllInProgressTasks } from "../services/getAllTasks.js";
import { getAllDoneTasks } from "../services/getAllTasks.js";

function App() {
  
  const [backlogTasks, setBacklogTasks] = useState();
  const [toDoTasks, setToDoTasks] = useState();
  const [inProgressTasks, setInProgressTasks] = useState();
  const [doneTasks, setDoneTasks] = useState();

  useEffect(() => {
    getAllBacklogTasks()
      .then((res) => {
        setBacklogTasks(res.data);
      })
      .catch((e) => {
        console.log("Error message: " + e.message);
        if (e.response) {
          console.log("Server response:", e.response.data); 
        } else {
          console.log("Error details:", e);
        }
      });
    getAllToDoTasks()
      .then((res) => {
        setToDoTasks(res.data);
      })
      .catch((e) => {
        console.log("Error message: " + e.message);
        if (e.response) {
          console.log("Server response:", e.response.data); 
        } else {
          console.log("Error details:", e);
        }
      });
    getAllInProgressTasks()
      .then((res) => {
        setInProgressTasks(res.data);
      })
      .catch((e) => {
        console.log("Error message: " + e.message);
        if (e.response) {
          console.log("Server response:", e.response.data); 
        } else {
          console.log("Error details:", e);
        }
      });
    getAllDoneTasks()
      .then((res) => {
        setDoneTasks(res.data);
      })
      .catch((e) => {
        console.log("Error message: " + e.message);
        if (e.response) {
          console.log("Server response:", e.response.data); 
        } else {
          console.log("Error details:", e);
        }
      });
  }, []);
  //backlogTasks,toDoTasks,inProgressTasks,doneTasks

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Board backlogTasks={backlogTasks} toDoTasks={toDoTasks} inProgressTasks={inProgressTasks} doneTasks={doneTasks} setToDoTasks={setToDoTasks}/>}></Route>
          <Route path="analytics" element={<Analytics  backlogTasks={backlogTasks} toDoTasks={toDoTasks} inProgressTasks={inProgressTasks} doneTasks={doneTasks}/>}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
