// import React from 'react'
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function RollRoutes({ children, allowedroes }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} />;
  }
  const decoded = jwtDecode(token);
  const userRole = decoded?.role?.toString().toLowerCase();
  const allowedRoles = allowedroes.map((role) => role.toLowerCase());

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={"/unauthorized"} />;
  }
  return children;
}
