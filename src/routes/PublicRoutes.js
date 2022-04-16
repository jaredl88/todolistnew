import { Redirect, Route } from "react-router-dom";
import { getToken } from "../service/auth";
import React from "react";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/addtask" }} />
        );
      }}
    />
  );
};

export default PublicRoute;
