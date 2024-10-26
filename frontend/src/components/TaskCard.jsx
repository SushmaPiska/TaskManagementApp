import React, { useState } from "react";
import styles from "./TaskCard.module.css";
import dots from "../assets/3dots.png";
import upArrow from "../assets/upArrow.png";
import downArrow from "../assets/downArrow.png";
import { formatDate } from "../../helper/formatDate";
import { getShortForm } from "../../helper/getShortForm";

function TaskCard({ title, priority, assignee, checkList, dueDate, taskType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const checkListToggle = () => {
    setIsOpen(!isOpen);
  };
  const menuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
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

  let switchArray = ["BACKLOG", "PROGRESS", "DONE"];

  return (
    <div className={styles.container}>
      <div className={styles.cardNav}>
        <div className={priorityClass}></div>
        <div className={styles.priorityText}>
          {priority.toUpperCase()} PRIORITY
        </div>
        <div className={styles.assignee}>{getShortForm(assignee)}</div>
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
            <li className={styles.menuItem}>Edit</li>
            <li className={styles.menuItem}>Share</li>
            <li className={styles.delete + " " + styles.menuItem}>Delete</li>
          </ul>
        </div>
      )}
      <div className={styles.title}>{title}</div>
      <div className={styles.checkList}>
        <div className={styles.checkListHead}>
          <p>Checklist(0/3)</p>
          <img
            src={isOpen ? upArrow : downArrow}
            onClick={checkListToggle}
            className={styles.arrowIcon}
          />
        </div>
        {isOpen && (
          <ul>
            {Object.entries(checkList).map(([key, value]) => (
              <li key={key} className={styles.checkItem}>
                <input type="checkbox" checked={value} className={styles.checkbox}/>
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.footer}>
        <div className={dueDateClass}>{formatDate(dueDate)}</div>
        {switchArray.map((item,index)=>(
          <div key={index} className={styles.footItem}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default TaskCard;
