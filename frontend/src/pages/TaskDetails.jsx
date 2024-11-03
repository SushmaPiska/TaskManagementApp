import React, { useEffect, useState } from "react";
import styles from "./TaskDetails.module.css";
import codesandbox from "../assets/codesandbox.png";
import SharedTask from "../components/SharedTask";
import { useParams } from "react-router-dom";
import axios from "axios";

function TaskDetails() {
    
  const { id } = useParams();
  const [task, setTask] = useState(null);
 
  useEffect(() => {
  
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/auth/getTaskById/${id}`)
      .then((response) => setTask(response.data))
      .catch((error) => console.error("Failed to fetch task:", error));

  }, [id]);
  if (!task) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={codesandbox} alt="" className={styles.icon} />
        <h3 className={styles.heading}>Pro Manage</h3>
      </div>
      <div className={styles.taskDetails}>
        
        <SharedTask task={task} />
      </div>
    </div>
  );
}

export default TaskDetails;
