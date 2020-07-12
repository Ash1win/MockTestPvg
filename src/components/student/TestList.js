import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Url from "../Url";
import axios from "axios";
import "./TestList.css";

function Test({ test }) {
  const history = useHistory();
  const handleAttempt = () => {
    if (window.confirm("You can attempt Test only once! Click ok to proceed")) {
      console.log("pressed confirm");
      const path = "/student/" + test._id;
      history.push(path);
    }
  };
  return (
    <div>
      {test.title} <button onClick={handleAttempt}>Attempt</button>
    </div>
  );
}

function TestList() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  useEffect(() => {
    api.get("/test/findTests").then((res) => {
      setTests(res.data.msg);
    });
  }, []);

  const [tests, setTests] = useState();
  return (
    <div className="testList-main-container">
      <h1>Tests</h1>
      {tests &&
        tests.map((test, i) => {
          return (
            <div className="testList-sub-container" key={i}>
              <Test test={test} />
            </div>
          );
        })}
    </div>
  );
}

export default TestList;
