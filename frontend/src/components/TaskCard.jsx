import React from "react";
import styles from "./TaskCard.module.css";
import dots from "../assets/3dots.png";
function TaskCard() {



  return (
    <div className={styles.container}>

      {tasks.map((text,index)=>(
        <div key={index} className={styles.taskCard}>
          <div className={styles.cardNav}>
          <div className={styles.priorityColor}></div>
          <div className={text.prirority}>{text.priority} PRIORITY</div>
          <img src={dots} alt="" />
        </div>
        <div className={styles.header}>{title}</div>
        <div className={styles.checkList}>
          <p>Checklist(0/3)</p>
          <p>^</p>
        </div>
        </div>
      ))}
      {/* <div className={styles.card}>
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
      </div> */}
    </div>
  );
}

export default TaskCard;
