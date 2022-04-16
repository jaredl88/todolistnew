import React, { useState } from "react";
import axios from "axios";
import { getUser } from "./service/auth";
import GetAuth from "./service/authToken";
const apiUrl =
process.env.REACT_APP_API_PREFIX + "/addtask";

const Todo = () => {
  const [tName, setTName] = useState("");
  const [tTxt, setTxt] = useState("");
  const userName = getUser();
  const username = userName.username;
  const [message, setMessage] = useState(null);
  const [getToken, setGetToken] = useState("");
  const tokenType = "Bearer";

  GetAuth().then(function (data) {
    setGetToken(data);
  });
  const submitHandler = (event) => {
    event.preventDefault();
    if (tName.trim() === "") {
      setMessage("Please enter a task Name");
      return;
    }
    if (tTxt.trim() === "") {
      setMessage("Please enter a task");
      return;
    }
    setMessage(null);

    const requestConfig = {
      //store as envirnment variable later
      headers: {
        authorization: `${tokenType} ${getToken}`,
      },
    };
    const requestBody = {
      ////get username from login
      username: username,
      tName: tName,
      tTxt: tTxt,
    };
    console.log(requestBody);
    axios
      .post(apiUrl, requestBody, requestConfig)
      .then((response) => {
        setMessage("Task Added Successfully");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage(error.response.data.message);
        } else {
          setMessage("sorry ... the server is down! please try again later");
        }
      });
  };

  return (
    <div class="flex justify-center pt-6">
      <div class="card lg:card-side bg-primary shadow-xl">
        <figure>
          <img
            src="https://cdn.pixabay.com/photo/2017/02/27/15/39/todo-2103511__340.png"
            alt="List"
          />
        </figure>
        <div class="card-body space-y-4 grid-flow-col">
          <form onSubmit={submitHandler}>
            <h2 class="card-title shadow-xl">
              <p class="text-black-500">Add New Task</p>
            </h2>
            <p>
              <input
                type="text"
                placeholder="Task Name"
                class="input input-bordered input-xl w-full max-w-xs m-2 w-48"
                value={tName}
                onChange={(event) => setTName(event.target.value)}
              />
              <br />
              <textarea
                type="text"
                placeholder="Task Description"
                class="textarea textarea-bordered w-52 h-52"
                value={tTxt}
                onChange={(event) => setTxt(event.target.value)}
              />{" "}
              <br />
            </p>
            <div class="card-actions justify-end">
              <button
                class="btn btn-sm bg-black-500"
                type="submit"
                value="addtask"
              >
                Add Task
              </button>
            </div>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Todo;
