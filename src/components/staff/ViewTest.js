import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Url from "../Url";
import axios from "axios";
import "./ViewTest.css";

function Test({ test, handleLoadTests }) {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  const handleDelete = () => {
    api.post("/test/delete", { testid: test._id }).then((res) => {
      console.log(res.data.msg);
      handleLoadTests();
    });
  };
  return (
    <div className="viewTest-list-container">
      <h3>
        {test.title}
        <Link to={`/staff/${test._id}`}>
          <button>View</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </h3>
    </div>
  );
}

function ViewTest() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  const [tests, setTests] = useState([]);

  useEffect(() => {
    api.get("/test/findMyTests").then((res) => {
      console.log(res.data.msg);
      setTests(res.data.msg);
    });
  }, []);

  const handleLoadTests = () => {
    api.get("/test/findMyTests").then((res) => {
      console.log(res.data.msg);
      setTests(res.data.msg);
    });
  };

  return (
    <div className="viewTest-main-container">
      <h1>View Test</h1>
      {tests &&
        tests.map((test) => {
          return (
            <Test
              key={test._id}
              test={test}
              handleLoadTests={handleLoadTests}
            />
          );
        })}
    </div>
  );
}

export default ViewTest;
