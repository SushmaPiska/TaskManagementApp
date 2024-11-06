import React, { useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./TaskCard.module.css";
import dots from "../assets/3dots.png";
import upArrow from "../assets/upArrow.png";
import downArrow from "../assets/downArrow.png";
import { formatDate } from "../../helper/formatDate";
import { getShortForm } from "../../helper/getShortForm";
import DeletePopup from "./DeletePopup";

function TaskCard({
  taskId,
  title,
  priority,
  assigneeEmail,
  checkList,
  dueDate,
  taskType,
  setDateSpace,
}) {
  console.log(assigneeEmail);
  // console.log(getShortForm(assigneeEmail))
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const checkListToggle = () => setIsOpen(!isOpen);
  const menuToggle = () => setIsMenuOpen(!isMenuOpen);

  const openDeletePopup = () => {
    setIsMenuOpen(false); 
    setDeletePopupOpen(true);
  };

  const closeDeletePopup = () => setDeletePopupOpen(false);

  const handleShare = async () => {
    try {
      const BASE_URL =
      import.meta.env.MODE === "development"
        ? "http://localhost:5173"
        : "https://taskmanagementapp-0mlj.onrender.com"
    
    
      const link = `${BASE_URL}/taskDetails/${taskId}`;
      await navigator.clipboard.writeText(link);
      setDateSpace(false);
      setTimeout(() => setDateSpace(true), 3000);
    } catch (error) {
      console.log("error in sharing" + error);
    }
  };
  let switchArray;
  if (taskType === "backlog") {
    switchArray = ["TODO", "PROGRESS", "DONE"];
  } else if (taskType === "toDo") {
    switchArray = ["BACKLOG", "PROGRESS", "DONE"];
  } else if (taskType === "inProgress") {
    switchArray = ["BACKLOG", "TODO", "DONE"];
  } else {
    switchArray = ["BACKLOG", "TODO", "PROGRESS"];
  }

  const handleSwitch = (item) => {
    console.log(taskId);
    let newType;
    if (item === "BACKLOG") {
      newType = "backlog";
    } else if (item === "PROGRESS") {
      newType = "inProgress";
    } else if (item === "DONE") {
      newType = "done";
    } else {
      newType = "toDo";
    }
    try {
      axios
        .put(`${import.meta.env.VITE_BASE_URL}/api/auth/updateTaskType/${taskId}`, {
          taskType: newType,
        })
        .then((res) => {
          console.log(res);
          console.log("task type updated successfully");
        })
        .catch((e) => {
          console.log("Error message: " + e.message);
          if (e.response) {
            console.log("Server response:", e.response.data);
          } else {
            console.log("Error details:", e);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  let priorityClass;
  let dueDateClass;
  if (priority === "high") {
    priorityClass = styles.high;
    dueDateClass = styles.redDate;
  } else if (priority === "moderate") {
    priorityClass = styles.moderate;
    dueDateClass = styles.dueDate;
  } else {
    priorityClass = styles.low;
    dueDateClass = styles.dueDate;
  }
  /////////////////////////////
  const now = new Date();
  let inCompleteClass;
  if(dueDate < now.getDate()){
    inCompleteClass=styles.redDate
  }
//////////////////////////////////
  return (
    <div className={styles.container}>
      <div className={styles.cardNav}>
        <div className={priorityClass}></div>
        <div className={styles.priorityText}>
          {priority.toUpperCase()} PRIORITY
        </div>
        {assigneeEmail &&  <div className={styles.assigneeShort}>{getShortForm(assigneeEmail)}
          
        </div>}
        <img
          src={dots}
          alt=""
          onClick={menuToggle}
          className={styles.menuIcon}
        />
      </div>

      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
            <li className={styles.menuItem} onClick={menuToggle}>
              Edit
            </li>
            <li
              className={styles.menuItem}
              onClick={() => {
                menuToggle();
                handleShare();
              }}
            >
              Share
            </li>
            <li
              className={`${styles.delete} ${styles.menuItem}`}
              onClick={openDeletePopup}
            >
              Delete
            </li>
          </ul>
        </div>
      )}

      <Popup
        open={isDeletePopupOpen}
        onClose={closeDeletePopup}
        modal
        nested
        className={styles.popup}
        contentStyle={{ width: "25%" }}
      >
        <DeletePopup closePopup={closeDeletePopup} taskId={taskId} />
      </Popup>

      <div className={styles.title} title={title}>{title}</div>
      <div className={styles.checkList}>
        <div className={styles.checkListHead}>
          <p>Checklist (0/3)</p>
          <img
            src={isOpen ? upArrow : downArrow}
            onClick={checkListToggle}
            className={styles.arrowIcon}
            alt="Toggle Checklist"
          />
        </div>
        {isOpen && (
          <ul>
            {Object.entries(checkList).map(([key, value]) => (
              <li key={key} className={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={value}
                  className={styles.checkbox}
                  readOnly
                />
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.footer}>
        {dueDate && (
          <div
            className={
              taskType === "done"
                ? `${dueDateClass} ${styles.doneDueDate} ${inCompleteClass}`
                : `${dueDateClass} ${inCompleteClass}`
            }
          >
            {formatDate(dueDate)}
          </div>
        )}

        {switchArray.map((item, index) => (
          <div
            key={index}
            className={styles.footItem}
            value={item}
            onClick={() => {
              handleSwitch(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskCard;
