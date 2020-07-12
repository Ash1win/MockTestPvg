import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Url from "../Url";
import axios from "axios";
import "./StudentAnalytics.css";

function StudentAnalytics() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  const [user, setUser] = useState({
    year: "1",
    department: "IT",
  });
  const [users, setUsers] = useState();
  const handleUserInfo = (e) => {
    const updatedUser = { ...user };
    updatedUser[e.target.name] = e.target.value;
    setUser(updatedUser);
    console.log(user);
  };
  const handleSubmit = () => {
    api
      .post("/student/listByYear", {
        department: user.department,
        year: user.year,
      })
      .then((res) => {
        console.log(res.data.msg);
        setUsers(res.data.msg);
      });
  };
  return (
    <div>
      <h1>Student Analytics</h1>
      <label>
        Choose Department:
        <select
          name="department"
          onChange={handleUserInfo}
          value={user.department}
        >
          <option value="IT">IT</option>
          <option value="COMPUTER">COMPUTER</option>
          <option value="MECHANICAL">MECHANICAL</option>
          <option value="E AND TC">E AND TC</option>
        </select>
      </label>
      <label>
        Choose Year:
        <select name="year" onChange={handleUserInfo} value={user.year}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Search</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.department}</td>
                  <td>{user.year}</td>
                  <td>
                    <Link
                      to={"/staff/studentDetail/" + user.name + "/" + user._id}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAnalytics;
