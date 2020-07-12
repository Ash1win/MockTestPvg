import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Url from "./Url";
import axios from "axios";
import "./loginPage.css";

const api = axios.create({
  baseURL: Url,
});
function LoginPage() {
  const [user, setUser] = useState({ type: "staff" });
  const handleChange = (e) => {
    const updatedUser = user;
    updatedUser[e.target.name] = e.target.value;
    setUser(updatedUser);
    console.log(user);
  };
  const history = useHistory();
  const handleSubmit = () => {
    if (user.type === "staff") {
      api.post("/staff/login", user).then((res) => {
        if (res.data.msg === "err") {
          alert("wrong username or password!");
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("type", user.type);
          history.push("/staff/createTest");
        }
        console.log(res.data);
      });
    } else {
      api.post("/student/login", user).then((res) => {
        if (res.data.msg === "err") {
          alert("wrong username or password!");
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("type", user.type);
          history.push("/student/tests");
        }
        console.log(res.data);
      });
    }
  };
  return (
    <div className="login-main-container">
      <div className="login-sub-container-2">
        <div>
          <h1>Mock Test Portal</h1>
          <span>
            An Initiative By Training And Placement Cell,PVGCOEN,Nashik
          </span>
        </div>
      </div>
      <div className="login-sub-container">
        <h1>Login</h1>
        <input name="email" placeholder="email" onChange={handleChange} />
        <input name="password" placeholder="password" onChange={handleChange} />
        <select name="type" onChange={handleChange}>
          <option value="staff">staff</option>
          <option value="student">student</option>
        </select>
        <button onClick={handleSubmit}>Login</button>
        <Link style={{ textAlign: "center", padding: "10px" }} to="/register">
          Register Staff
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
