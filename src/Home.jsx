import React from "react";
import {useNavigate} from 'react-router-dom'

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Hello there</h1>
            <p class="prose py-9 text-xl">
              My name is Jared and this is my first React/Nodejs project.You can
              add tasks to your task list, view task your list, set tasks as
              complete, and view a list of your completed tasks. It uses API
              Gateway, Lambda, and DynamoDB for the back-end. For the front end
              I used React on an S3 bucket.
            </p>
            <div class="space-x-4">
              <button
                class="btn btn-primary pr=1.5"
                onClick={() => {
                  window.open("/Register");
                }}
              >
                Register
              </button>
              <button
                class="btn btn-primary"
                onClick={() => {
                  window.open("login");
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
