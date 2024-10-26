import React, { useEffect, useState } from "react";
import styles from "./Section.module.css";
import TaskCard from "./TaskCard";



function Section({tasks}) {
  
  const [isLoading,setIsLoading]=useState(true);

useEffect(() =>{
  setIsLoading(false)
})
  return (
    <div className={styles.container}>
      {isLoading? <p>Loading...</p>:
        tasks?.map((task,index)=>(
          <p key={index} className={styles.card}>
            <TaskCard title={task.title} priority={task.priority} assignee={task.assignee} checkList={task.checkList} dueDate={task.dueDate} taskType={task.taskType}/>
          </p>
        ))
      }
    </div>
  );
}

export default Section;
