import React from "react";
import { Navigate } from "react-router-dom";

function SignAndRegRoute(props) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}

export default SignAndRegRoute;
