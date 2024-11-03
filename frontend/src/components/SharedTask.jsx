import React, { useState } from "react";
import styles from "./SharedTask.module.css";
import axios from "axios";
import { formatDate } from "../../helper/formatDate";
import { getShortForm } from "../../helper/getShortForm";
import DeletePopup from "./DeletePopup";

function SharedTask({ task }) {
  let priorityClass;
  let dueDateClass;
  if (task.priority === "high") {
    priorityClass = styles.high;
    dueDateClass = styles.redDate;
  } else if (task.priority === "moderate") {
    priorityClass = styles.moderate;
    dueDateClass = styles.dueDate;
  } else {
    priorityClass = styles.low;
    dueDateClass = styles.dueDate;
  }
  /////////////////////////////
  const now = new Date();
  let inCompleteClass;
  if (task.dueDate < now.getDate()) {
    inCompleteClass = styles.redDate;
  }
  //////////////////////////////////
  return (
    <div className={styles.container}>
      <div className={styles.cardNav}>
        <div className={priorityClass}></div>
        <div className={styles.priorityText}>
          {task.priority?.toUpperCase()} PRIORITY
        </div>
        <div className={styles.assignee}>{getShortForm(task.assignee)}</div>
      </div>

      <div className={styles.title} title={task.title}>
        {task.title}
      </div>
      <div className={styles.checkList}>
        <div className={styles.checkListHead}>
          <p>Checklist (0/3)</p>
        </div>

        <ul>
          {task.checkList &&
            Object.entries(task.checkList).map(([key, value]) => (
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
      </div>

      <div className={styles.footer}>
        
        {task.dueDate && (<>
            <span className={styles.dueDateText}>Due Date</span>
          <div
            className={
              task.taskType === "done"
                ? `${dueDateClass} ${styles.doneDueDate} ${inCompleteClass}`
                : `${dueDateClass} ${inCompleteClass}`
            }
          >
            {formatDate(task.dueDate)}
          </div></>
        )}
      </div>
    </div>
  );
}

export default SharedTask;
