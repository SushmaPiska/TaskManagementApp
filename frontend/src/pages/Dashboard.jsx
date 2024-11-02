import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
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
import LogoutPopup from "../components/LogoutPopup.jsx";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleBoard = () => {
    navigate("/dashboard");
  };
  const handleAnalytics = () => {
    navigate("analytics");
  };
  const handleSettings = () => {
    navigate("settings");
  };

  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);

  const openLogoutPopup = () => {
    setLogoutPopupOpen(true);
  };
  const closeLogoutPopup = () => {
    setLogoutPopupOpen(false);
  };

  const handleLogout = async () => {
    try {
      axios
        .post("http://localhost:8000/api/auth/logout", {
          withCredentials: true,
        })
        .then((response) => {
          // if (response.data.status) {
          // navigate("/");
          localStorage.removeItem("token");
          window.location.href = "/login";
          console.log("logged out successfully");
          // }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response?.data || error.message
      );
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
        <div className={styles.logout} onClick={openLogoutPopup}>
          <img src={logoutIcon} alt="" className={styles.icon} />
          <p>Log out</p>
        </div>
        <Popup
          open={isLogoutPopupOpen}
          onClose={closeLogoutPopup}
          modal
          nested
          className={styles.popup}
          contentStyle={{ width: "25%" }}
        >
          <LogoutPopup
            closePopup={closeLogoutPopup}
            handleLogout={handleLogout}
          />
        </Popup>
      </div>
      <div className={styles.rightContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
