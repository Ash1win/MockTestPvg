import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Url from "../Url";
import axios from "axios";

function StudentAnalyticDetails() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  const [results, setResults] = useState();
  const { name, id } = useParams();

  useEffect(() => {
    api.post("/result/getResultAll", { studentid: id }).then((res) => {
      console.log(res.data);
      setResults(res.data.msg);
    });
  }, []);

  return (
    <div>
      <h1>Student Analytic Details</h1>
      <h3>Student: {name}</h3>
      {results &&
        results.map((result, i) => {
          return (
            <div key={i}>
              Title: {result.testtitle}
              <br />
              Marks: {result.marks + "/" + result.totalmarks}
              <br />
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default StudentAnalyticDetails;
