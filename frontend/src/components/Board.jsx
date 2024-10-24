import React, { useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./Board.module.css";
import people from "../assets/people.png";
import collapse_all from "../assets/collapse-all.png";
import NewTaskPopup from "./NewTaskPopup";
import BacklogSection from "./BacklogSection";
import ToDoSection from "./ToDoSection";
import InProgressSection from "./InProgressSection";
import DoneSection from "./DoneSection";

function Board() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef();

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleNewTaskPopup = () => {};
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
          <BacklogSection />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>To do</h3>

            {/* <h1 onClick={handleNewTaskPopup}>+</h1> */}

            <Popup
              className={styles.popup}
              // contentStyle={{ width: "45%" }}
              trigger={
                <h1 className={styles.addButton} onClick={openPopup}>
                  +
                </h1>
              }
              modal
              nested
              open={isOpen}
              onClose={() => setIsOpen(false)}
              ref={popupRef}
            >
              <NewTaskPopup />
            </Popup>
            <img src={collapse_all} alt="" />
          </div>
          <ToDoSection/>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>In progress</h3>
            <img src={collapse_all} alt="" />
          </div>
          <InProgressSection/>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3>Done</h3>
            <img src={collapse_all} alt="" />
          </div>
          <DoneSection/>
        </div>
      </div>
    </div>
  );
}

export default Board;
