import React from "react";
import { Navigate } from "react-router-dom";
import useAdminAuth from "../../hooks/useAdminAuth";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useAdminAuth();

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
