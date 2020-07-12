import React, { useState, useEffect } from "react";
import Url from "../Url";
import axios from "axios";
import "./MyHistory.css";

function MyHistory() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  const [resultList, setResultList] = useState();
  useEffect(() => {
    api.post("/result/getResult").then((res) => {
      console.log(res.data.msg);
      setResultList(res.data.msg);
    });
  }, []);
  return (
    <div className="myHistory-main-container">
      <h1>My History</h1>
      {resultList &&
        resultList.map((result, i) => {
          return (
            <div className="myHistory-sub-container" key={i}>
              <span>Test :</span> {result.testtitle}
              <hr />
              <span>Marks :</span> {result.marks + "/" + result.totalmarks}
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default MyHistory;
