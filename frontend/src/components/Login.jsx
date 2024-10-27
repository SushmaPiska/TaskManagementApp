import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const errorMessages = {
    email: {
      message: "Email is required",
      isValid: email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    let isError = false;
    e.preventDefault();
    Object.keys(errorMessages).forEach((key) => {
      if (!errorMessages[key].isValid) {
        isError = true;
        errorMessages[key].onError();
      }
    });
    if (!isError) {
      try {
        axios.post(
          "http://localhost:8000/api/auth/login",
          { email: email, password: password },
          { withCredentials: true }
        )
          .then((res) => {
            // if (response.data.status) {
            const token = res.data.token;
            localStorage.setItem("token", token);
            navigate("/dashboard");
            console.log("loggedin successfully");

            // }
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
        console.error(
          "Error logging in:",
          error.response?.data || error.message
        );
      }
    }
  };
  const handleSignup = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.inputFields}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className={styles.inputItem + " " + styles.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && (
          <p className={styles.errorText}>{errorMessages.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={styles.inputItem + " " + styles.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && (
          <p className={styles.errorText}>{errorMessages.password.message}</p>
        )}
      </div>
      <button className={styles.loginBtn} onClick={handleLogin}>
        Login
      </button>
      <p className={styles.text}>Have no account yet?</p>
      <button className={styles.registerBtn} onClick={handleSignup}>
        Register
      </button>
    </div>
  );
}

export default Login;
