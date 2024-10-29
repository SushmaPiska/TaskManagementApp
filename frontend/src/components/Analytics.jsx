import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import axios from "axios";
import { getTasksByPriority } from "../../services/getAllTasks";
function Analytics({ backlogTasks, toDoTasks, inProgressTasks, doneTasks }) {
  const [highPriority, setHighPriority] = useState(0);
  const [moderatePriority, setModeratePriority] = useState(0);
  const [lowPriority, setLowPriority] = useState(0);

  useEffect(() => {
    getTasksByPriority("high")
      .then((res) => {
        setHighPriority(res.data);
      })
      .catch((e) => {
        console.log("Error message: " + e.message);
        if (e.response) {
          console.log("Server response:", e.response.data);
        } else {
          console.log("Error details:", e);
        }
      });
  }, [highPriority]);
  useEffect(() => {
    getTasksByPriority("moderate")
      .then((res) => {
        setModeratePriority(res.data);
      })
      .catch((e) => {
        console.log("Error message: " + e.message);
        if (e.response) {
          console.log("Server response:", e.response.data);
        } else {
          console.log("Error details:", e);
        }
      });
  }, [moderatePriority]);
  useEffect(() => {
    getTasksByPriority("low")
      .then((res) => {
        setLowPriority(res.data);
      })
      .catch((e) => {
        console.log("Error message: " + e.message);
        if (e.response) {
          console.log("Server response:", e.response.data);
        } else {
          console.log("Error details:", e);
        }
      });
  }, [lowPriority]);
  // console.log(backlogTasks.length)
  return (
    <div className={styles.container}>
      <h2>Analytics</h2>
      <div className={styles.list}>
        <div className={styles.list1}>
          <div className={styles.listItem}>
            <div className={styles.point}></div>
            <p>Backlog Tasks</p>
            <h4 className={styles.backlogCount + " " + styles.count}>
              {backlogTasks.length}
            </h4>
          </div>
          <div className={styles.listItem}>
            <div className={styles.point}></div>
            <p>To-do Tasks</p>
            <h4 className={styles.toDoCount + " " + styles.count}>
              {toDoTasks.length}
            </h4>
          </div>
          <div className={styles.listItem}>
            <div className={styles.point}></div>
            <p>In-Progress Tasks</p>
            <h4 className={styles.inProgressCount + " " + styles.count}>
              {inProgressTasks.length}
            </h4>
          </div>
          <div className={styles.listItem}>
            <div className={styles.point}></div>
            <p>Completed Tasks</p>
            <h4 className={styles.completedCount + " " + styles.count}>
              {doneTasks.length}
            </h4>
          </div>
        </div>
        <div className={styles.list2}>
          <div className={styles.listItem}>
            <div className={styles.point}></div>
            <p>Low Priority</p>
            <h4 className={styles.lowPriorityCount + " " + styles.count}>
              {lowPriority}
            </h4>
          </div>
          <div className={styles.listItem}>
            <div className={styles.point}></div>
            <p>Moderate Priority</p>
            <h4 className={styles.moderatePriorityCount + " " + styles.count}>
              {moderatePriority}
            </h4>
          </div>
          <div className={styles.listItem}>
            <div className={styles.point}></div>
            <p>High Priority</p>
            <h4 className={styles.highPriorityCount + " " + styles.count}>
              {highPriority}
            </h4>
          </div>
          <div className={styles.listItem}>
            <div className={styles.point}></div>
            <p>Due Date Tasks</p>
            <h4 className={styles.dueDateCount + " " + styles.count}>16</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
