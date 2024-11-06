import React from "react";
import styles from "./DeletePopup.module.css";
import axios from "axios";
function DeletePopup({ closePopup,taskId ,setIsTaskDeleted}) {
  const handleDelete = (taskId) => {
    console.log(taskId)
    closePopup();

    try {
      axios
        .delete(
          `${import.meta.env.VITE_BASE_URL}/api/auth/delete/${taskId}`,
          
        )
        .then((res) => {
          setIsTaskDeleted(true)
          console.log("task deleted successfully");

        })
        .catch((e) => {
          console.log("Error message: " + e.message);
          if (e.response) {
            console.log("Server response:", e.response.data);
          } else {
            console.log("Error details:", e);
          }
        });
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };


return (
  <div className={styles.container}>
    <h4>Are you sure you want to Delete?</h4>
    <button className={styles.deleteBtn} onClick={()=>handleDelete(taskId)} >
      Yes, Delete
    </button>
    <button className={styles.cancelBtn} onClick={()=>closePopup()}>Cancel</button>
  </div>
);
}
export default DeletePopup;
