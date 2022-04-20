import { getUser } from "../service/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
const apiUrl =process.env.REACT_APP_API_PREFIX + "/getcompleted";
const apiAddUrl =process.env.REACT_APP_API_PREFIX +"/addtask";
  const tokenType = "Bearer";
const CompletedTaskList = () => {
  const [getResult, setGetResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [tTxt, setTtxt] = useState("");
  const [tName, setTname] = useState("");
  const [cookies, setCookie] = useCookies(['user']);
  const username = cookies.user;

  

  const runObtainAuthToken = async () => {
    const authToken = await getAuth0Token();
    setCookie('authToken', authToken, {path: '/'});
 };
 async function getAuth0Token() {
    let url = process.env.REACT_APP_AUTH_URL;

    let requestConfig = { headers: { "content-type": "application/json" } };
    let data =
    process.env.REACT_APP_CLIENT_INFO;

    const response = await axios.post(url, data, requestConfig);
    if (!response || response === undefined) console.log("error");
    
   return response.data.access_token;
 }
  const fetchData = async () => {
    console.log(cookies.authToken);
  
     const requestConfig = {
       //store as envirnment variable later
       headers: {
         authorization: `${tokenType} ${cookies.authToken}`,
       },
     };

 console.log(requestConfig);
     const requestBody = {
       username: username,
     };
     console.log(requestBody);
     const response = await axios.post(apiUrl, requestBody, requestConfig);
     if (!response) {
       setErrorMessage("There was an error retrieving tasks");
     }
     setGetResult(response.data.getResponse.Items[0]);
   };

  const addTask = (event) => {
    event.preventDefault();
  
    const requestConfig = {
      //store as envirnment variable later
      headers: {
        authorization: `${tokenType} ${cookies.authToken}`,
      },
    };
   console.log(requestConfig);
    const requestBody = {
      username: username,
      tName: tName,
      tTxt: tTxt,
    };
    const response = axios.post(apiAddUrl, requestBody, requestConfig);
    if (!response) {
      setErrorMessage("There was an error retrieving tasks");
    }
    setMessage("");
  };

 
  useEffect(() =>{
    runObtainAuthToken();
  },[]);
  
 // useEffect(() =>{
 //   console.log(getAuthToken);
 // },[getAuthToken]);

  useEffect(() => {
    fetchData();
  },[]);

  useEffect(() => {
   
    console.log(getResult);
    
    
  }, [getResult]);

  
  console.log(getResult);
  const taskArray = Object.entries(getResult);
  console.log(taskArray);


  return (
    <div className="TaskList">
      {taskArray &&
        taskArray.map((taskArrays) => {
          if (taskArrays[0] !== "username" && taskArrays[0] !== "Username") {
            return (
              <form onSubmit={addTask}>
                <div
                  key={taskArrays[0]}
                  style={{ alignItems: "center", margin: "20px 60px" }}
                >
                  <div class="divider text-2xl">{taskArrays[0]}</div>
                  <div class="flex flex-col w-full border-opacity-50">
                    <div class="grid h-20 card bg-base-300 rounded-box place-items-center text-xl">
                      {taskArrays[1]}
                      <button
                        class="btn btn-sm bg-black-500"
                        type="submit"
                        value="submit"
                        onClick={(event) => {
                          setTname(taskArrays[0].toString());
                          setTtxt(taskArrays[1].toString());
                        }}
                      >
                        Add back to todo
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            );
          }
        })}
    </div>
  );
};

export default CompletedTaskList;
