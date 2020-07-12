import React, { useState, useEffect } from "react";
import axios from "axios";
import Url from "../Url";
import { useParams, useHistory } from "react-router-dom";

function TestAttemptView() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  const { testId } = useParams();
  const [test, setTest] = useState();
  useEffect(() => {
    api.post("/test/findTestById", { testid: testId }).then((res) => {
      console.log(res.data.msg);
      setTest(res.data.msg);
    });
  }, []);
  const handleChange = (e) => {
    const id = e.target.getAttribute("idx");
    const index = test.quetions.findIndex((quetion) => quetion.id === id);
    const updatedTest = { ...test };
    updatedTest.quetions[index].setAnswer = e.target.getAttribute("datax");
    setTest(updatedTest);
  };
  const handleSubmit = () => {
    let marks1 = 0;
    test.quetions.map((quetion) => {
      if (quetion.answer === quetion.setAnswer) {
        marks1++;
      }
    });
    api
      .post("/result/save", {
        testid: testId,
        marks: marks1,
        totalmarks: test.quetions.length,
        testtitle: test.title,
      })
      .then((res) => {
        if (res.data.msg === "success") {
          console.log(res.data);
          history.push("/student/tests");
        }
      });
    console.log(marks1);
  };
  return (
    <div>
      <h1>Test Attempt View</h1>
      <ul>
        {test &&
          test.quetions.map((quetion, i) => {
            return (
              <li key={i}>
                {quetion.quetion}
                <ul>
                  <li>
                    {quetion.option1}
                    <input
                      type="radio"
                      idx={quetion.id}
                      datax={quetion.option1}
                      onChange={handleChange}
                      name={"select-" + i}
                    />
                  </li>
                  <li>
                    {quetion.option2}
                    <input
                      type="radio"
                      idx={quetion.id}
                      datax={quetion.option2}
                      onChange={handleChange}
                      name={"select-" + i}
                    />
                  </li>
                  <li>
                    {quetion.option3}
                    <input
                      type="radio"
                      idx={quetion.id}
                      datax={quetion.option3}
                      onChange={handleChange}
                      name={"select-" + i}
                    />
                  </li>
                  <li>
                    {quetion.option4}
                    <input
                      type="radio"
                      idx={quetion.id}
                      datax={quetion.option4}
                      onChange={handleChange}
                      name={"select-" + i}
                    />
                  </li>
                </ul>
              </li>
            );
          })}
      </ul>
      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  );
}

export default TestAttemptView;
