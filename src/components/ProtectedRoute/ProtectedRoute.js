import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {

   if (props.loggedIn !== true) {
    return <Navigate replace to="/" />
  }
  return <Component {...props} />
}

export default ProtectedRoute;
