import {  Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useCookies } from 'react-cookie';


const useAuth=()=>{
  const [cookies, getCookie] = useCookies(['user']);
  const userCookie = cookies.user;
  if(!userCookie || userCookie === undefined || userCookie === null){
    return false
  } else {
    return true
  }
}

  const PublicRoute = () => {
    const auth = useAuth();
    
    return auth ? <Navigate to="/addTask" /> : < Outlet/> 
  }


export default PublicRoute;
