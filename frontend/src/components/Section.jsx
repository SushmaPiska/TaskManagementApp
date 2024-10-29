import React, { useEffect, useState } from "react";
import styles from "./Section.module.css";
import TaskCard from "./TaskCard";
import { isDateInPeriod } from "../../helper/dueDateFilter";

function Section({ tasks, setDateSpace, duration }) {
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    setIsLoading(false);
  });
  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        tasks?.map((task, index) => (
          // console.log(task.dueDate+" "+isDateInCurrentWeek(task.dueDate))
          isDateInPeriod(task.dueDate,duration)  && <p key={index} className={styles.card}>
            <TaskCard
              taskId={task._id}
              title={task.title}
              priority={task.priority}
              assignee={task.assignee}
              checkList={task.checkList}
              dueDate={task.dueDate}
              taskType={task.taskType}
              setDateSpace={setDateSpace}
            />
          </p>
        ))
      )}
    </div>
  );
}

export default Section;
