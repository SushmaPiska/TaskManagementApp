import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

export default function Register() {

  const baseUrl=import.meta.env.VITE_BASE_URL


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); 

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

    // Reset backend errors
    setError({
      name: { message: "", isVisible: false },
      email: { message: "", isVisible: false },
      password: { message: "", isVisible: false },
      confirmPassword: { message: "", isVisible: false },
    });

    // Frontend validation
    Object.keys(frontendErrorMessages).forEach((key) => {
      if (!frontendErrorMessages[key].isValid) {
        isError = true;
        setError((prevError) => ({
          ...prevError,
          [key]: { message: frontendErrorMessages[key].message, isVisible: true },
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
        navigate("/login");
      } catch (err) {
        setLoading(false);
        if (err.response && err.response.data.errors) {
          const backendErrors = err.response.data.errors;
          backendErrors.forEach(({ msg, param }) => {
            setError((prevError) => ({
              ...prevError,
              [param]: { message: msg, isVisible: true },
            }));
          });
        } else {
          console.error("Unexpected error:", err);
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
        {error.name.isVisible && <p className={styles.errorText}>{error.name.message}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          className={styles.inputItem + " " + styles.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email.isVisible && <p className={styles.errorText}>{error.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          className={styles.inputItem + " " + styles.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password.isVisible && <p className={styles.errorText}>{error.password.message}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          className={styles.inputItem + " " + styles.password}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error.confirmPassword.isVisible && (
          <p className={styles.errorText}>{error.confirmPassword.message}</p>
        )}
      </div>

      <button className={styles.registerBtn} onClick={handleSignup} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      <p className={styles.text}>Have an account ?</p>
      <button className={styles.loginBtn} onClick={handleLogin} disabled={loading}>
        Log in
      </button>
    </div>
  );
}
