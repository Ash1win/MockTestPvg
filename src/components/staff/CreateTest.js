import React, { useState } from "react";
import axios from "axios";
import Url from "../Url";
import { v4 as uuid } from "uuid";
import "./CreateTest.css";

function CreateTest() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: Url,
    headers: { Authorization: token },
  });
  const [mcqInput, setMcqInput] = useState({
    title: "",
    year: "1",
    department: "IT",
    quetions: [
      {
        quetion: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        setAnswer: "",
        id: uuid(),
      },
    ],
  });

  const handleChange = (e) => {
    const updatedMcqInput = { ...mcqInput };
    if (
      e.target.name === "title" ||
      e.target.name === "year" ||
      e.target.name === "department"
    ) {
      updatedMcqInput[e.target.name] = e.target.value;
      setMcqInput(updatedMcqInput);
    } else {
      if (e.target.getAttribute("namex") === "answer") {
        console.log("editing asnwer");
        const idx = e.target.getAttribute("idx");
        const index = mcqInput.quetions.findIndex(
          (quetion) => quetion.id === idx
        );
        updatedMcqInput.quetions[index].answer = e.target.value;
        setMcqInput(updatedMcqInput);
      } else {
        const idx = e.target.getAttribute("idx");
        const index = mcqInput.quetions.findIndex(
          (quetion) => quetion.id === idx
        );
        updatedMcqInput.quetions[index][e.target.name] = e.target.value;
        setMcqInput(updatedMcqInput);
      }
    }
  };

  const clearAllInputs = () => {
    setMcqInput({
      title: "",
      year: "1",
      department: "IT",
      quetions: [
        {
          quetion: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
          id: uuid(),
        },
      ],
    });
  };

  const handleSubmit = () => {
    if (mcqInput.title === "") {
      alert("Input fields should not be empty!");
    } else {
      api.post("/test/create", mcqInput).then((res) => {
        console.log(res.data);
      });
      setMcqInput({
        title: "",
        year: "1",
        department: "IT",
        quetions: [
          {
            quetion: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            answer: "",
            id: uuid(),
          },
        ],
      });
    }
  };

  const quetionsList = mcqInput.quetions.map((quetion, i) => {
    return (
      <div className="createTest-sub-container-2" key={i}>
        <h3>Quetion {i + 1}</h3>
        <input
          name="quetion"
          value={quetion.quetion}
          idx={quetion.id}
          onChange={handleChange}
          placeholder="Quetion"
        />
        <div>
          <input
            name="option1"
            value={quetion.option1}
            idx={quetion.id}
            onChange={handleChange}
            placeholder="option 1"
          />
          <input
            name={"asnwer-" + i}
            namex="answer"
            idx={quetion.id}
            value={quetion.option1}
            type="radio"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="option2"
            value={quetion.option2}
            idx={quetion.id}
            onChange={handleChange}
            placeholder="option 2"
          />
          <input
            name={"asnwer-" + i}
            namex="answer"
            idx={quetion.id}
            value={quetion.option2}
            type="radio"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="option3"
            value={quetion.option3}
            idx={quetion.id}
            onChange={handleChange}
            placeholder="option 3"
          />
          <input
            name={"asnwer-" + i}
            namex="answer"
            idx={quetion.id}
            value={quetion.option3}
            type="radio"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="option4"
            value={quetion.option4}
            idx={quetion.id}
            onChange={handleChange}
            placeholder="option 4"
          />
          <input
            name={"asnwer-" + i}
            namex="answer"
            idx={quetion.id}
            value={quetion.option4}
            type="radio"
            onChange={handleChange}
          />
        </div>
      </div>
    );
  });

  const handleAddQuetion = () => {
    const updatedMcqInput = { ...mcqInput };
    const emptyQuetion = {
      quetion: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      id: uuid(),
    };
    updatedMcqInput.quetions.push(emptyQuetion);
    setMcqInput(updatedMcqInput);
    console.log(mcqInput);
  };

  return (
    <div className="createTest-main-container">
      <h1>Create Mcq Test</h1>
      <div className="createTest-sub-container-1">
        <input
          name="title"
          value={mcqInput.title}
          placeholder="title"
          onChange={handleChange}
        />
        <select name="year" value={mcqInput.year} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="All">All</option>
        </select>

        <select
          name="department"
          value={mcqInput.department}
          onChange={handleChange}
        >
          <option value="IT">IT</option>
          <option value="COMPUTER">COMPUTER</option>
          <option value="MECHANICAL">MECHANICAL</option>
          <option value="E AND TC">E AND TC</option>
          <option value="All">All</option>
        </select>
        <button onClick={clearAllInputs}>Clear</button>
      </div>
      {quetionsList}
      <button onClick={handleAddQuetion}>Add Quetion</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateTest;
