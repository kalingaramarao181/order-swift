import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import RestaurantDashboardHomePage from "./pages/HomePage";
import BillingPage from "./pages/BillingPage";
import BookingsPage from "./pages/BookingsPage";
import TablesPage from "./pages/ManageTablesPage";
import ManageMenu from "./pages/MangeMenuPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import { getRestaurantDetails } from "../api/restaurentApi";

const Dashboard = () => {

  const [restaurantDetails, setRestaurantDetails] = useState({});

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await getRestaurantDetails(3);
        setRestaurantDetails(response);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };
    fetchRestaurantDetails();
  }, []);
  
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<RestaurantDashboardHomePage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/manage-menu" element={<ManageMenu />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
