import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Route = require("react-router-dom").Route;

const PublicRoute = ({ children, restricted }) => {
  console.log(children, "choldredn");

  const userRow = useSelector((row) => row);
  return (
    <>
      {userRow.user.isLoggedIn && restricted ? (
        <Navigate to="/" replace />
      ) : (
        children
      )}
    </>
  );
};

export default PublicRoute;
