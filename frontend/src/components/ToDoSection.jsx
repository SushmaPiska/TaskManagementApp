import React from "react";
import styles from "./ToDoSection.module.css";

import TaskCard from "./TaskCard";
function ToDoSection() {
  return (
    <div className={styles.container}>
      <TaskCard/>
    </div>
  );
}

export default ToDoSection;
