import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Routes, NavLink } from "react-router-dom";
import  Home  from "../../Home";
import  Login  from "../../Login";
import  Todo  from "../../pages/addtask";
import Register from "../../Register";
import TaskList from "../../pages/TaskList";
import { resetUserSession, getUser } from "../../service/auth";
import  CompletedTaskList  from "../../pages/getCompleted";
import { UserContext } from "../../userContext";
import PublicRoute from "../../routes/PublicRoutes.js";
import {useCookies} from 'react-cookie';
import PrivateRoute from "../../routes/PrivateRoutes";
const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [cookies, setCookie] = useCookies(['user']);

  const user = getUser();
  useEffect(() => {
     
    if(user !== null && user !== undefined) setLoggedIn(true);
    else setLoggedIn(false);
    console.log(user);
  }, [loggedIn]);
  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

  const Logout = () => {
    resetUserSession();
    setLoggedIn(false);
    window.location.reload(false);
    window.open("/login");
  };

  return (
    <>
      
      <BrowserRouter>
        <div class="top-9">
          <div class="navbar">
            <div class="flex-1">
              <button class="btn shadow-xl" onClick={<Home />}>
                <NavLink exact activeClassName="active" to="/">
                  Home
                </NavLink>
              </button>
            </div>
            <div class="flex-none visible hover:invisible">
              <ul class="menu menu-horizontal p-0">
                <li tabindex="0">
                  <a>
                    Links
                    <svg
                      class="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                  </a>

                  <ul class="p-2 bg-base-100 inset-y-7 visible static">
                    <div>
                      {cookies.user === null || cookies.user === undefined ? (
                        <div>
                          <li>
                            <NavLink exact to="/Login">
                              Login
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/Register">
                              Register
                            </NavLink>
                          </li>
                        </div>
                      ) : (
                        <div>
                          <li>
                            <NavLink to="/addtask">
                              Add Task
                            </NavLink>
                          </li>
                          <li>
                            <NavLink  to="/TaskList"> Task List </NavLink>
                          </li>
                          <li>
                            <NavLink to="/getCompleted"
                            >
                              Completed Tasks List
                            </NavLink>
                          </li>
                        </div>
                      )}
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
            <div>
              {cookies.user ? (
                <div class="flex-1 right-0">
                  <button class="btn shadow-xl" onClick={<Login />}>
                    <NavLink  to="/Login">
                      Login
                    </NavLink>
                  </button>
                </div>
              ) : (
                <div class="flex-1 right-0">
                  <button class="btn shadow-xl" onClick={Logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route  path="/register" element={<Register />} />
            <Route  path="/login" element={<Login />} />
            <Route  path="/addtask" element={<Todo />} />
            <Route  path="/TaskList" element={<TaskList />} />
            <Route  path="/getCompleted" element={<CompletedTaskList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Header;