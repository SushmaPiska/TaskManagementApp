import React from 'react'
import styles from './LogoutPopup.module.css'
function LogoutPopup({closePopup,handleLogout}) {
  return (
    <div className={styles.container}>
    <h4>Are you sure you want to Logout?</h4>
    <button className={styles.logoutBtn} onClick={handleLogout} >
      Yes, Logout
    </button>
    <button className={styles.cancelBtn} onClick={()=>closePopup()}>Cancel</button>
  </div>
  )
}

export default LogoutPopup