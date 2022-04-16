import axios from "axios";
import { setAuthToken } from "./auth";

const GetAuth = () => {
  async function getToken() {
    let url = process.env.REACT_APP_AUTH_URL;

    let requestConfig = { headers: { "content-type": "application/json" } };
    let data =
    process.env.REACT_APP_CLIENT_INFO;

    const response = await axios.post(url, data, requestConfig);
    if (!response || response === undefined) console.log("error");
    setAuthToken(response.data.access_token);
    return response.data.access_token;
  }

  var authToken = getToken();
  return authToken;
};

export default GetAuth;


