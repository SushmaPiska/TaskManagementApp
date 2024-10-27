import React from 'react'
import styles from './AddedPeopleSuccess.module.css'
function AddedPeopleSuccess({closePopup}) {
  const userEmail="Akashgupta@gmail.com"
  return (

    <div className={styles.container}>
      <h3>{userEmail} added to board</h3>
      <button className={styles.gotItBtn} onClick={closePopup}>Okay, got it!</button>
    </div>
  )
}

export default AddedPeopleSuccess