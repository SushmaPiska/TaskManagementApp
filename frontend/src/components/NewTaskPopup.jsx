import React, { useState } from "react";
import styles from "./NewTaskPopup.module.css";
import deleteIcon from "../assets/delete.png";
import axios from "axios";

function NewTaskPopup({ setToDoTasks, closePopup }) {
  // const baseUrl = import.meta.env.VITE_BASE_URL;

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [checkList, setCheckList] = useState({});
  const [checkListItem, setCheckListItem] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const handleTaskSave = async (e) => {
    e.preventDefault();

    try {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/auth/createTask`, {
          title: title,
          priority: priority,
          assignee: assignee,
          checkList: checkList,
          dueDate: dueDate?dueDate:"",
          taskType: "toDo",
        })
        .then((res) => {
          console.log(res);
          closePopup();
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

  const handleAddItem = () => {
    console.log(checkList);
    setCheckList((prevCheckList) => ({
      ...prevCheckList,
      [checkListItem]: false,
    }));
  };
  const handleDeleteCheck = () => {};

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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.priority}>
        <label htmlFor="priority">
          Select Priority <span className={styles.requiredStar}>*</span>
        </label>
        <div
          className={`${styles.highPriority} ${styles.priorityItem}`}
          // value="high"
          onClick={(e) => {
            setPriority("high");
          }}
          style={{ backgroundColor: priority === "high" ? "#ebefef" : "transparent" }}
        >
          <div className={`${styles.highColor} ${styles.ball}`}></div>
          <div className={styles.priorityName}>HIGH PRIORITY</div>
        </div>
        <div
          className={`${styles.moderatePriority} ${styles.priorityItem}`}
          value="high"
          onClick={(e) => setPriority("moderate")}
          style={{ backgroundColor: priority === "moderate" ? "#ebefef" : "transparent" }}

          
        >
          <div className={`${styles.moderateColor}  ${styles.ball}`}></div>
          <div className={styles.priorityName}>MODERATE PRIORITY</div>
        </div>
        <div
          className={`${styles.lowPriority} ${styles.priorityItem}`}
          value="high"
          onClick={(e) => setPriority("low")}
          style={{ backgroundColor: priority === "low" ? "#ebefef" : "transparent" }}

        >
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
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
      </div>
      <label htmlFor="checkList">
        Checklist (1/3) <span className={styles.requiredStar}>*</span>
      </label>
      <ul>
        <div className={styles.checkListItem}>
          <input type="checkbox" className={styles.checkBox} />
          <input
            type="text"
            placeholder="Add a task"
            value={checkListItem}
            onChange={(e) => setCheckListItem(e.target.value)}
            className={styles.checkListInput}
          />
          <img
            src={deleteIcon}
            alt=""
            className={styles.deleteIcon}
            onClick={handleDeleteCheck}
          />
        </div>
        {Object.keys(checkList).map((item) => (
          <li className={styles.checkListItem}>
            <input
              type="checkbox"
              className={styles.checkBox}
              checked={checkList[item]}
              onChange={() =>
                setCheckList({
                  ...checkList,
                  [item]: !checkList[item],
                })
              }
            />

            <input type="text" className={styles.checkListInput} />

            <img
              src={deleteIcon}
              alt=""
              className={styles.deleteIcon}
              onClick={handleDeleteCheck}
            />
          </li>
        ))}
      </ul>

      <div className={styles.addNew} onClick={handleAddItem}>
        + Add New
      </div>
      <div className={styles.footer}>
        <input
          placeholder="Select Due Date"
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          className={styles.selectDueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className={styles.cancelBtn} onClick={closePopup}>Cancel</button>
        <button className={styles.saveBtn} onClick={handleTaskSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default NewTaskPopup;
