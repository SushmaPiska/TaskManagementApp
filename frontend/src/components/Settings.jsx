import React, { useState } from "react";
import styles from "./Settings.module.css";
function Settings() {
  const [passwordToggle,setPasswordToggle] =useState(true)
  return (
    <div className={styles.container}>
      <h2>Settings</h2>
      <div className={styles.updateList}>
        <input
          type="text"
          placeholder="Name"
          className={styles.inputItem + " " + styles.name}
        />
        <input
          type="email"
          placeholder="Update Email"
          className={styles.inputItem + " " + styles.email}
        />
        <input
          type="password"
          placeholder="Old Password"
          className={styles.inputItem + " " + styles.password}
        />

        <input
          type="password"
          placeholder="New Password"
          className={styles.inputItem + " " + styles.password}
        />
        <div className={styles.errorMessage}>* you can update only one field at once</div>
        <button className={styles.updateBtn}>Update</button>
      </div>
    </div>
  );
}

export default Settings;
