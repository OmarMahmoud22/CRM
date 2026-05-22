// import React from 'react'
import { Navigate } from "react-router-dom";
// import { login } from '../../../../../BACKEND/Controller/AuthController'
export default function AuthRoutes({ children }) {
  // const navifate = useNavigate()
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
