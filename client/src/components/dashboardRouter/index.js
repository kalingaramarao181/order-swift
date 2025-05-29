// components/DashboardRouter.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AdminDashboard from "../../adminDashboard";
import Dashboard from "../../restaurent";
import UserDashboard from "../../userDashboard";


const DashboardRouter = () => {
  const token = Cookies.get("jwtToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (role === 1) return <AdminDashboard />;
    if (role === 2) return <Dashboard />;
    if (role === 3) return <UserDashboard />;
    
    return <p>Unknown role</p>;
  } catch (error) {
    Cookies.remove("jwtToken");
    return <Navigate to="/" replace />;
  }
};

export default DashboardRouter;
