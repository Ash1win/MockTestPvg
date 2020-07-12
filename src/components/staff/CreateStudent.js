import React, { useState, useEffect } from "react";
import axios from "axios";
import Url from "../Url";
import "./CreateStudent.css";

function StudenList({ user, getStudentList }) {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  const handleDelete = () => {
    api.post("/student/delete", { deleteId: user._id }).then((res) => {
      console.log(res.data);
      getStudentList();
    });
  };
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.department}</td>
      <td>{user.year}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

function CreateStudent() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  useEffect(() => {
    api.get("/student/list").then((res) => {
      setUserList(res.data.msg);
      console.log(res.data.msg);
    });
  }, []);
  const [user, setUser] = useState({
    department: "IT",
    email: "",
    name: "",
    password: "",
    year: "1",
  });
  const [userList, setUserList] = useState();
  const handleUserInfo = (e) => {
    const updatedUser = { ...user };
    updatedUser[e.target.name] = e.target.value;
    setUser(updatedUser);
  };
  const handleSubmit = () => {
    if (user.name === "" || user.email === "" || user.password === "") {
      alert("Inputs should not be empty!");
    } else {
      api.post("/student/create", user).then((res) => {
        console.log(res.data);
        setUser({
          department: "IT",
          email: "",
          name: "",
          password: "",
          year: "1",
        });
        alert("student created");
        getStudentList();
      });
    }
  };
  const getStudentList = () => {
    api.get("/student/list").then((res) => {
      setUserList(res.data.msg);
      console.log(userList);
    });
  };

  return (
    <div className="createStudent-main-container">
      <h1>Create Student</h1>
      <div className="createStudent-sub-container">
        <input
          name="name"
          placeholder="name"
          onChange={handleUserInfo}
          value={user.name}
        />
        <input
          name="email"
          placeholder="email"
          onChange={handleUserInfo}
          value={user.email}
        />
        <input
          name="password"
          placeholder="password"
          onChange={handleUserInfo}
          value={user.password}
        />
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
        <button onClick={handleSubmit}>create</button>
      </div>
      <div className="createStudent-sub-container-2">
        <div className="createStudent-sub-container-2-sub">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Department</th>
                <th>Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList &&
                userList.map((user, i) => {
                  return (
                    <StudenList
                      user={user}
                      key={i + 1}
                      getStudentList={getStudentList}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateStudent;
