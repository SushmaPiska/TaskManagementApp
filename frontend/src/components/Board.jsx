import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./Board.module.css";
import people from "../assets/People.png";
import collapse_all from "../assets/collapse-all.png";
import NewTaskPopup from "./NewTaskPopup";
import Section from "./Section.jsx";
import AddPeoplePopup from "./AddPeoplePopup.jsx";
import AddedPeopleSuccess from "./AddedPeopleSuccess.jsx";
import { getTodayDate } from "../../helper/formatDate.js";

function Board({
  backlogTasks,
  toDoTasks,
  inProgressTasks,
  doneTasks,
  setToDoTasks,
  addTask,
  setIsTaskCreated,
  setIsTaskDeleted
}) {
  useEffect(() => {
    console.log("Updated toDoTasks:", toDoTasks);
  }, [toDoTasks]);

  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // console.log(storedUser.name)
  // const userName = storedUser ? storedUser?.name : null;
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = storedUser && storedUser.name ? storedUser.name : "Guest"; // Default to "Guest" if user or name is missing

  const [todayDate, setTodayDate] = useState();
  const [dateSpace, setDateSpace] = useState(true);
  const [duration, setDuration] = useState("This week");

  const popupRef = useRef();

  const [isAddPeoplePopupOpen, setAddPeoplePopupOpen] = useState(false);
  const [taskType, setTaskType] = useState();

  useEffect(() => {
    setTodayDate(getTodayDate);
  });
  // useEffect(()=>{
  //   console.log(duration)
  // },[duration])

  const openAddPeoplePopup = () => {
    setAddPeoplePopupOpen(true);
  };
  const closeAddPeoplePopup = () => {
    setAddPeoplePopupOpen(false);
  };

  const handleAddPeople = () => {};

  const handleCollapse = (taskType) => {
    console.log(taskType);
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}/api/auth/deleteOneTypeTasks`, {
        data: { taskType: taskType },
      })
      .then((res) => {
        console.log("Tasks deleted successfully:", res.data);
      })
      .catch((e) => {
        console.log("Error message: " + e.message);
        if (e.response) {
          console.log("Server response:", e.response.data);
        } else {
          console.log("Error details:", e);
        }
      });
  };
  const handleSave = (newTask) => {
    // This will update the toDoTasks state in App.jsx
    setToDoTasks((prevTasks) => [...prevTasks, newTask]);
  };
  // const createTask = async (taskData) => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/api/auth/createTask`,
  //       taskData
  //     );
  //     return response.data.task; // Return the created task
  //   } catch (error) {
  //     console.error("Error creating task:", error);
  //     return null;
  //   }
  // };
  
  // const handleTaskSave = async (taskData) => {
  //   const newTask = await createTask(taskData);
  //   if (newTask) {
  //     addTask(newTask); 
  //   }
  // };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome! {userName}</h2>
        <div className={dateSpace ? styles.date : styles.copiedNote}>
          {dateSpace ? todayDate : "Link Copied"}
        </div>
        <div className={styles.headerOptions}>
          <h1>Board</h1>
          <div className={styles.addPeople} onClick={openAddPeoplePopup}>
            <img src={people} alt="" />
            <p>Add People</p>
          </div>

          <Popup
            open={isAddPeoplePopupOpen}
            onClose={closeAddPeoplePopup}
            modal
            nested
            className={styles.popup}
            contentStyle={{ width: "30%" }}
          >
            <AddPeoplePopup closePopup={closeAddPeoplePopup} />
          </Popup>

          <select
            className={styles.dropdown}
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          >
            <option value="Today">Today</option>
            <option value="This week">This week</option>
            <option value="This month">This month</option>
            <option value="All">All</option>
          </select>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>Backlog</h3>
            <img
              src={collapse_all}
              onClick={() => handleCollapse("backlog")}
              className={styles.collapseAllIcon}
            />
          </div>
          <Section
            tasks={backlogTasks}
            setDateSpace={setDateSpace}
            duration={duration}
            setIsTaskDeleted={setIsTaskDeleted}
          />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>To do</h3>
            <Popup
              className={styles.popup}
              // contentStyle={{ width: "47%" }}
              trigger={<h3 className={styles.addButton}>+</h3>}
              modal
              nested
              ref={popupRef}
            >
              {(close) => (
                <NewTaskPopup
                  setToDoTasks={setToDoTasks}
                  closePopup={close}
                  addTask={addTask}
                  onSave={handleSave}
                  setIsTaskCreated={setIsTaskCreated}
                />
              )}
              {/* <NewTaskPopup setToDoTasks={setToDoTasks} /> */}
            </Popup>
            <img
              src={collapse_all}
              alt=""
              className={styles.collapseAllIcon}
              onClick={() => handleCollapse("toDo")}
            />
          </div>
          <div className={styles.toDo}>
            <Section
              tasks={toDoTasks}
              setDateSpace={setDateSpace}
              duration={duration}
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>In progress</h3>
            <img
              src={collapse_all}
              className={styles.collapseAllIcon}
              alt=""
              onClick={() => handleCollapse("inProgress")}
            />
          </div>
          <Section
            tasks={inProgressTasks}
            setDateSpace={setDateSpace}
            duration={duration}
          />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>Done</h3>
            <img
              src={collapse_all}
              className={styles.collapseAllIcon}
              alt=""
              onClick={() => handleCollapse("done")}
            />
          </div>
          <Section
            tasks={doneTasks}
            setDateSpace={setDateSpace}
            duration={duration}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
