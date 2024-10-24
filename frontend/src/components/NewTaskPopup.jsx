import React, { useState } from "react";
import styles from "./NewTaskPopup.module.css";
import deleteIcon from "../assets/delete.png";

function NewTaskPopup() {
  
 
  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="Title">
          Title <span className={styles.requiredStar}>*</span>{" "}
        </label>
      </div>
      <input
        type="text"
        placeholder="Enter task Title"
        className={styles.taskInput}
      />
      <div className={styles.priority}>
        <label htmlFor="priority">
          Select Priority <span className={styles.requiredStar}>*</span>
        </label>
        <div className={`${styles.highPriority} ${styles.priorityItem}`}>
          <div className={`${styles.highColor} ${styles.ball}`}></div>
          <div className={styles.priorityName}>HIGH PRIORITY</div>
        </div>
        <div className={`${styles.moderatePriority} ${styles.priorityItem}`}>
          <div className={`${styles.moderateColor}  ${styles.ball}`}></div>
          <div className={styles.priorityName}>MODERATE PRIORITY</div>
        </div>
        <div className={`${styles.lowPriority} ${styles.priorityItem}`}>
          <div className={`${styles.lowColor} ${styles.ball}`}></div>
          <div className={styles.priorityName}>LOW PRIORITY</div>
        </div>
      </div>
      <div className={styles.assignDiv}>
        <label htmlFor="assignee">Assign to</label>
        <input
          type="text"
          placeholder="Add an assignee"
          className={styles.assigneeInput}
        />
      </div>
      <label htmlFor="checkList">
        Checklist (1/3) <span className={styles.requiredStar}>*</span>
      </label>
      <div className={styles.checkListItem}>
        <input type="checkbox" value="Done Task" className={styles.checkBox} />
        <input type="text" className={styles.checkListInput} />
        <img src={deleteIcon} alt="" className={styles.deleteIcon} />
      </div>

      <div className={styles.addNew}>+ Add New</div>
      <div className={styles.footer}>
        <input
          placeholder="Select Due Date"
          type="text"  
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          className={styles.selectDueDate}
        />
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.saveBtn}>Save</button>
      </div>
    </div>
  );
}

export default NewTaskPopup;
