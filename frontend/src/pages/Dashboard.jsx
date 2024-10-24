import React from "react";
import styles from "./Dashboard.module.css";
import codesandbox from "../assets/codesandbox.png";
import layoutIcon from "../assets/layout.png";
import databaseIcon from "../assets/database.png";
import settingsIcon from "../assets/settings.png";
import logoutIcon from "../assets/logout.png";
import Board from "../components/Board.jsx";
import Analytics from "../components/Analytics.jsx";
import Settings from "../components/Settings.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const handleBoard = () => {
    navigate("/dashboard");
  };
  const handleAnalytics = () => {
    navigate("analytics");
  };
  const handleSettings = () => {
    navigate("settings");
  };
  const handleLogout = async () => {  
    try {
      axios.post(
        "http://localhost:8000/api/auth/logout",
        { withCredentials: true }
      ).then((response) => {
        // if (response.data.status) {
        navigate("/");
        console.log("logged out successfully");
        // }
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    }
  };

  return (
      <div className={styles.container}>
        <div className={styles.leftMenu}>
          <div className={styles.header}>
            <img src={codesandbox} alt="" className={styles.icon} />
            <h3 className={styles.heading}>Pro Manage</h3>
          </div>
          <div className={styles.menuItem} onClick={handleBoard}>
            <img src={layoutIcon} alt="" className={styles.icon} />
            <p className={styles.board}>Board</p>
          </div>
          <div className={styles.menuItem} onClick={handleAnalytics}>
            <img src={databaseIcon} alt="" className={styles.icon} />
            <p className={styles.analytics}>Analytics</p>
          </div>
          <div className={styles.menuItem} onClick={handleSettings}>
            <img src={settingsIcon} alt="" className={styles.icon} />
            <p className={styles.settings}>Settings</p>
          </div>
          <div className={styles.logout} onClick={handleLogout}>
            <img src={logoutIcon} alt="" className={styles.icon} />
            <p>Log out</p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <Outlet/>
          {/* <Routes>
            <Route path="/board" element={<Board />}></Route>
            <Route path="/analytics" element={<Analytics />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
          </Routes> */}
          {/* <Board /> */}
        </div>
      </div>
  );
}

export default Dashboard;
