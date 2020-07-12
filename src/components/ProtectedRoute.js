import React from "react";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({ path, children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Route path={path}>{children}</Route>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
