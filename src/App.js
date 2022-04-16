import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/auth";
import Header from "./Components/Header/Header";
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';

const verifyTokenAPIURL = process.env.REACT_APP_API_PREFIX + "/verify";

function App(props) {
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [getAuthToken, setGetAuthToken] = useState(null);
  const tokenType = "Bearer";


  
  const runObtainAuthToken = async () => {
    const authToken = await getAuth0Token();
    if(authToken)
    setGetAuthToken(authToken);
  };

  useEffect(() =>{
    runObtainAuthToken();
  },[]);

 useEffect(() =>{
    
      const token = getToken();
      if(getAuthToken && token){
      const requestConfig = {
        //store as envirnment variable later
        headers: {
          authorization: `${tokenType} ${getAuthToken}`,
        },
      };
     
      const requestBody = {
        user: getUser(),
        token: token
      };
      console.log(getUser());
      axios.post(verifyTokenAPIURL, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setAuthenticating(false);
      })
      .catch(() => {
          resetUserSession();
          setAuthenticating(false);
        });

    }
  },[getAuthToken]);
  
 
    async function getAuth0Token() {
    let url = process.env.REACT_APP_AUTH_URL;

    let requestConfig = { headers: { "content-type": "application/json" } };
    let data =
    process.env.REACT_APP_CLIENT_INFO;

    const response = await axios.post(url, data, requestConfig);
    if (!response || response === undefined) console.log("error");
    return response.data.access_token;
  }
  const token = getToken();
  if (isAuthenticating && token) {
    return <div className="content">Authenticating...</div>;
  }
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;