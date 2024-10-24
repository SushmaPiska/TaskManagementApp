import React from "react";
import styles from "./ToDoSection.module.css";
import dots from '../assets/3dots.png';
function ToDoSection() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardNav}>
          <div className={styles.priorityColor}></div>
          <div className={styles.priorityText}>HIGH PRIORITY</div>
          <img src={dots} alt="" />
        </div>
        <div className={styles.header}>Hero Section</div>
        <div className={styles.checkList}>
            <p>Checklist(0/3)</p>
            <p>^</p>
        </div>
      </div>
    </div>
  );
}

export default ToDoSection;
