import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();
export default function Register() {
  
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [backendError, setBackendError] = useState("");

  const [error, setError] = useState({
    name: { message: "", isVisible: false },
    email: { message: "", isVisible: false },
    password: { message: "", isVisible: false },
    confirmPassword: { message: "", isVisible: false },
  });

  const navigate = useNavigate();

  const frontendErrorMessages = {
    name: {
      message: "Name is required",
      isValid: name.length > 0,
    },
    email: {
      message: "Email is required",
      isValid: email.length > 0,
    },
    password: {
      message: "Password is required",
      isValid: password.length > 0,
    },
    confirmPassword: {
      message: "Passwords do not match",
      isValid: confirmPassword === password,
    },
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let isError = false;
    setBackendError("")
    setError({
      name: { message: "", isVisible: false },
      email: { message: "", isVisible: false },
      password: { message: "", isVisible: false },
      confirmPassword: { message: "", isVisible: false },
    });

    Object.keys(frontendErrorMessages).forEach((key) => {
      if (!frontendErrorMessages[key].isValid) {
        isError = true;
        setError((prevError) => ({
          ...prevError,
          [key]: {
            message: frontendErrorMessages[key].message,
            isVisible: true,
          },
        }));
      }
    });

    if (!isError) {
      setLoading(true);
      try {
        await axios.post(`${baseUrl}/api/auth/signup`, {
          name,
          email,
          password,
          confirmPassword,
        });
        toast.success("Registration successful!");
        navigate("/login");
      } catch (err) {
        setLoading(false);
        if (err.response) {
          console.log(err.response.data.error)
        
            setBackendError(err.response.data.error);
         
        } else {
          console.log("Error details:", error);
          setBackendError("Network error. Please try again.");
        }
    
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <div className={styles.inputFields}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          className={styles.inputItem + " " + styles.name}
          onChange={(e) => setName(e.target.value)}
        />
        {error.name.isVisible && (
          <p className={styles.errorMessage}>* {error.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          className={styles.inputItem + " " + styles.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email.isVisible && (
          <p className={styles.errorMessage}>* {error.email.message}</p>
        )}

        <div>
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
          {error.password.isVisible && (
            <p className={styles.errorMessage}>* {error.password.message}</p>
          )}

          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.inputItem} ${styles.password}`}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.eyeIcon}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error.confirmPassword.isVisible && (
            <p className={styles.errorMessage}>
              * {error.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      {backendError && <div className={styles.errorMessage}>* {backendError}</div>}
      <button
        className={styles.registerBtn}
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <p className={styles.text}>Have an account ?</p>
      <button
        className={styles.loginBtn}
        onClick={handleLogin}
        disabled={loading}
      >
        Log in
      </button>
    </div>
  );
}
