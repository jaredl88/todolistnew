import {  Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useCookies, withCookies } from 'react-cookie';


const useAuth=()=>{
  const [cookies, getCookie] = useCookies(['user']);
  const userCookie = cookies.user;
  if(!userCookie || userCookie === undefined || userCookie === null){
    return false
  } else {
    return true
  }
}

  const PrivateRoute = () => {
    const auth = useAuth();
    
    return auth ? < Outlet/> : <Navigate to="/Login" />
  }


export default PrivateRoute;
