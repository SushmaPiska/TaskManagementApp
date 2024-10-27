import React, { useState } from "react";
import styles from "./AddPeoplePopup.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
function AddPeoplePopup({ closePopup }) {
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);

  const openSuccessPopup = () => {
    setSuccessPopupOpen(true);
  };

  const closeSuccessPopup = () => {
    setSuccessPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Add people to board</h3>
      <input
        type="email"
        placeholder="Enter the email"
        className={styles.emailInput}
      />
      <button className={styles.cancelBtn} onClick={closePopup}>
        Cancel
      </button>

      <button
        className={styles.addBtn}
        onClick={() => {
            closePopup();
            openSuccessPopup();
        }}
      >
        Add Email
      </button>

      <Popup
        open={isSuccessPopupOpen}
        onClose={closeSuccessPopup}
        modal
        nested
        className={styles.popup}
        contentStyle={{ width: "30%" }}
      >
        <AddPeoplePopup closePopup={closeSuccessPopup} />
      </Popup>
    </div>
  );
}

export default AddPeoplePopup;
