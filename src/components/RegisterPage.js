import React, { useState } from "react";
import Url from "./Url";
import axios from "axios";
import "./RegisterPage.css";

function RegisterPage() {
  const api = axios.create({
    baseURL: Url,
  });
  const [user, setUser] = useState({ department: "IT" });
  const handleUserInfo = (e) => {
    const updatedUser = user;
    updatedUser[e.target.name] = e.target.value;
    setUser(updatedUser);
    console.log(user);
  };
  const handleSubmit = () => {
    api.post("/staff/create", user).then((res) => {
      if (res.data.msg === "success") {
        alert("staff user is succesfully created!");
      } else {
        alert("wrong key user not created!");
      }
      console.log(res);
    });
  };
  return (
    <div className="register-main-container">
      <div className="register-sub-container">
        <h1>Register Staff</h1>
        <input
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleUserInfo}
        />
        <label>
          Choose Department:
          <select name="department" onChange={handleUserInfo}>
            <option value="IT">IT</option>
            <option value="COMPUTER">COMPUTER</option>
            <option value="MECHANICAL">MECHANICAL</option>
            <option value="E AND TC">E AND TC</option>
          </select>
        </label>
        <input
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleUserInfo}
        />
        <input
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleUserInfo}
        />
        <input
          name="key"
          value={user.key}
          placeholder="Secrete Key"
          onChange={handleUserInfo}
        />
        <button onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}

export default RegisterPage;
