import React from "react";
import { Routes, Route, useNavigate ,Outlet} from "react-router-dom";
import styles from "./HomePage.module.css";
import Login from "../components/Login";
import Register from "../components/Register";
import dollImage from "../assets/doll.png";
import dollBack from "../assets/dollBack.png";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.leftContainer}>
            <div className={styles.imageContainer}>
              <img src={dollBack} className={styles.dollBack} />
              <img src={dollImage} className={styles.doll} />
            </div>
            <div className={styles.textContainer}>
              <h2 className={styles.headLine}>Welcome aboard my friend</h2>
              <p className={styles.tagLine}>
                Just a couple of clicks and we start
              </p>
            
            </div>
          </div>
        </div>
        <div className={styles.right}>
        <Outlet />
          {/* <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
