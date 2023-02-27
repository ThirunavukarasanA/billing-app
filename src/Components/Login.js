import axios from "axios";
import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    let data = { email: values.email, password: values.password };
    axios.post(`http://localhost:7000/api/login`, data)
    .then((response) => {
      setValues({
        email: "",
        password: "",
      })
      console.log(response)
      localStorage.setItem("token",response.data.token)
      window.location="/labour"
    })
    .catch((err)=>{
      console.log(err)
    })
  
  }

  return (
    <div className="bg-img">
      <div className="border rounded-md mx-[40%] absolute top-[25%] login-form">
        <h2 className="text-3xl mt-5 text-center text-white">Login</h2>
        <div className="p-10">
          <div className="mb-3">
            <label className="text-white">Email </label>
            <br />
            <input
              className="border"
              id="email"
              value={values.email}
              onChange={(e) => {
                setEmail(e.target.value);
                values.email = e.target.value;
                console.log(e.target.value);
              }}
            />
            <br />
          </div>
          <div className="">
            <label className="text-white">Password</label>
            <br />
            <input
              className="border"
              value={values.password}
              onChange={(e) => {
                setPassword(e.target.value);
                values.password = e.target.value;
                console.log(e.target.value);
              }}
            />
            <br />
          </div>
        </div>
        <div className="">
          <button
            onClick={(e) => handleSubmit(e)}
            className="border bg-green-700 text-white px-5 py-1 rounded-md mx-[30%]"
          >
            Submit
          </button>
        </div>
        {/* <div className="text-center mt-4 mx-10">
          <p className="text-white">
            Click here{" "}
            <a href="/adminlogin" className="text-blue-200">
              Admin Login
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
}
