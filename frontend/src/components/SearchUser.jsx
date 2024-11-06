import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './SearchUser.module.css';

const SearchUser = ({ setAssigneeEmail }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/searchUsers`, {
            params: { query },
          });
          if (Array.isArray(response.data)) {
            setUsers(response.data);
            setError(null);
          } else {
            setUsers([]);
            setError("Unexpected data format received from the server.");
          }
        } catch (error) {
          console.error("Error fetching users", error);
          setUsers([]);
          setError("Error fetching users. Please try again.");
        }
      };
      fetchUsers();
    } else {
      setUsers([]);
      setError(null);
    }
  }, [query]);

  const handleSuggestionClick = (email) => {
    setQuery(email);
    setAssigneeEmail(email); 
    setUsers([]); 
  };

  return (
    <div className={styles.container}>
      <input
        type="email"
        placeholder="Add an assignee"
        value={query}
        className={styles.assigneeInput}
        onChange={(e) => {
          setQuery(e.target.value);
          setAssigneeEmail(e.target.value);
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {Array.isArray(users) && users.length > 0 && (
        <div className={styles.suggestions}>
          {users.map((user) => (
            <div
              key={user._id}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(user.email)}
            >
              {user.email}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
