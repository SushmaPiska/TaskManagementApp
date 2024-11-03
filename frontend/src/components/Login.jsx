import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("")

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
  
    // Validate fields
    Object.keys(errorMessages).forEach((key) => {
      if (!errorMessages[key].isValid) {
        isError = true;
        errorMessages[key].onError();
      }
    });
  
    if (!isError) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
          { email: email, password: password },
          { withCredentials: true }
        );
  
        console.log("Logged in successfully", response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/dashboard";
      } catch (error) {
        console.log("Error object:", error);
  
        if (error.response) {
          console.log("Response exists:", error.response);
          console.log("Response data:", error.response.data);
  
          if (error.response.data && error.response.data.error) {
            const message = error.response.data.error; 
            setBackendError(message);
            console.log("Setting backendError:", message); 
          } else {
            console.log("Unexpected error structure:", error.response.data);
            setBackendError("An unexpected error occurred."); 
          }
        } else {
          console.log("Error details:", error);
          setBackendError("Network error. Please try again."); 
        }
      }
    }
  };
  
  useEffect(() => {
    console.log("Backend Error:", backendError);
  }, [backendError]); 
  
  
  
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
          <p className={styles.errorMessage}>* {errorMessages.email.message}</p>
        )}
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            className={`${styles.inputItem} ${styles.password}`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeIcon}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {error.password && (
          <p className={styles.errorMessage}>*  {errorMessages.password.message}</p>
        )}
      </div>
      {console.log(backendError)}
      {backendError && <div className={styles.errorMessage}>* {backendError}</div>}
      
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
