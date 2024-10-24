import { useState } from "react";
import Form from "./Form.jsx";
import { registerAxios } from "../../services/axios.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const token=localStorage.getItem("token");
  if(token) {
    console.log("token: " + token);
    navigate("/dashboard");
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      value: formData.name,
      onChange: (e) => {
        setFormData({ ...formData, name: e.target.value });
      },
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      value: formData.email,
      onChange: (e) => {
        setFormData({ ...formData, email: e.target.value });
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      value: formData.password,
      onChange: (e) => {
        setFormData({ ...formData, password: e.target.value });
      },
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      value: formData.confirmPassword,
      onChange: (e) => {
        setFormData({ ...formData, confirmPassword: e.target.value });
      },
    },
  ];

  console.log(error);

  const errorMessages = {
    name: {
      message: "Name is required",
      isValid: formData.name.length > 0,
      onError: () => {
        setError((error) => ({ ...error, name: true }));
      },
    },
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
    confirmPassword: {
      message: "Passwords do not match",
      isValid: formData.confirmPassword === formData.password,
      onError: () => {
        setError((error) => ({ ...error, confirmPassword: true }));
      },
    },
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let isError = false;

    Object.keys(errorMessages).forEach((key) => {
      if (!errorMessages[key].isValid) {
        isError = true;
        errorMessages[key].onError();
      }
    });

    if (!isError) {
      axios
        .post("http://localhost:8000/api/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
        .then((response) => {
          // if(response.data.status){
          navigate("/login");
          console.log("registered successfully");
          // }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Form
        error={error}
        formFields={formFields}
        onSubmit={onSubmit}
        errorMessages={errorMessages}
      />
    </div>
  );
}

//////////////////////////////////////////
// import React, { useState } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Axios from 'axios';

// import styles from "./Register.module.css";

// export default function Register() {

// const [name,setName]=useState("")
// const [email,setEmail]=useState("")
// const [password,setPassword]=useState("")
// const [confirmPassword,setConfirmPassword]=useState("")

// const navigate=useNavigate()

//   const handleSignup=async()=>{
//     Axios.post("http://localhost:8000/api/auth/signup",{
//       name:name,
//       email:email,
//       password:password,
//       confirmPassword:confirmPassword
//     }).then((response)=>{
//       if(response.data.status){
//         navigate("/login")
//         console.log("registered successfully")
//       }
//     }).catch(()=>{
//       console.log("error")
//     })
//     // setName("")
//     // setEmail("")
//     // setPassword("")
//     // setConfirmPassword("")
//   }
//   const handleLogin=()=>{
//     navigate("/login")
//   }

//   return (
//     <div className={styles.container} >
//       <h1>Register</h1>
//       <div className={styles.inputFields}>
//         <input type="text" placeholder="Name" value={name}  className={styles.inputItem+" "+styles.name} onChange={(e)=>setName(e.target.value)}/>
//         <input type="email" placeholder="Email" value={email} className={styles.inputItem+" "+styles.email} onChange={(e)=>setEmail(e.target.value)}/>
//         <input type="password" placeholder="Password" value={password} className={styles.inputItem+" "+styles.password} onChange={(e)=>setPassword(e.target.value)}/>
//         <input type="password" placeholder="Confirm Password" value={confirmPassword} className={styles.inputItem+" "+styles.password} onChange={(e)=>setConfirmPassword(e.target.value)}/>
//       </div>
//       <button className={styles.registerBtn} onClick={handleSignup}>Register</button>
//       <p className={styles.text}>Have an account ?</p>
//       <button className={styles.loginBtn} onClick={handleLogin}>Log in</button>
//     </div>
//   );
// }
