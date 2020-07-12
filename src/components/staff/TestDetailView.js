import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Url from "../Url";
import axios from "axios";

function TestDetailView() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  const [test, setTest] = useState();
  const { testId } = useParams();
  useEffect(() => {
    api.post("/test/findTestById", { testid: testId }).then((res) => {
      console.log(res.data.msg);
      setTest(res.data.msg);
    });
  }, []);
  return (
    <div>
      {test && (
        <div>
          <h3>Title : {test.title}</h3>
          <h3>Year : {test.year}</h3>
          <h3>Department : {test.department}</h3>
          <h4>Quetions</h4>
          <ul>
            {test.quetions.map((quetion) => {
              return (
                <li>
                  {quetion.quetion}
                  <ul>
                    <li>{quetion.option1}</li>
                    <li>{quetion.option2}</li>
                    <li>{quetion.option3}</li>
                    <li>{quetion.option4}</li>
                    <li>Answer : {quetion.answer}</li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TestDetailView;
