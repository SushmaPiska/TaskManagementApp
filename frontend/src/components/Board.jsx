import React, { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./Board.module.css";
import people from "../assets/People.png";
import collapse_all from "../assets/collapse-all.png";
import NewTaskPopup from "./NewTaskPopup";
import Section from "./Section.jsx";


function Board({backlogTasks,toDoTasks,inProgressTasks,doneTasks, setToDoTasks}) {


  const popupRef = useRef();

  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome! kumar</h2>
        <div className={styles.date}>12th Jan, 2024</div>
        <div className={styles.headerOptions}>
          <h1>Board</h1>
          <div className={styles.addPeople}>
            <img src={people} alt="" />
            <p>Add People</p>
          </div>

          <select name="" id="" className={styles.dropdown}>
            <option value="Today">Today</option>
            <option value="This week">This week</option>
            <option value="This month">This month</option>
          </select>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>Backlog</h3>
            <img src={collapse_all} alt="" />
          </div>
          <Section tasks={backlogTasks} />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>To do</h3>

           

            <Popup
              className={styles.popup}
              // contentStyle={{ width: "45%" }}
              trigger={<h3 className={styles.addButton}>+</h3>}
              modal
              nested
              ref={popupRef}
              
            >
              {(close) => <NewTaskPopup setToDoTasks={setToDoTasks} closePopup={close} />}
              {/* <NewTaskPopup setToDoTasks={setToDoTasks} /> */}
            </Popup>
            <img src={collapse_all} alt="" className={styles.collapseAllIcon} />
          </div>
          <div className={styles.toDo}>
            <Section tasks={toDoTasks} />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>In progress</h3>
            <img src={collapse_all} alt="" />
          </div>
          <Section tasks={inProgressTasks} />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>Done</h3>
            <img src={collapse_all} alt="" />
          </div>
          <Section tasks={doneTasks} />
        </div>
      </div>
    </div>
  );
}

export default Board;
