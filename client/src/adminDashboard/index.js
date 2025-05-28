import React, {useState, useEffect} from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import "../restaurent/styles/HomePage.css";
import MyOrdersPage from "./pages/MyOrdersPage";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import FeedbackPage from "./pages/FeedbackPage";
import NotificationsPage from "./pages/NotificationsPage";
import {getRestaurants} from "../api/restaurentApi";
import RestaurantsPage from "./pages/RestaurantsPage";
import { getAllUsers } from "../api/usersApi";
import UsersPage from "./pages/UsersPage";

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        const users = await getAllUsers();
        setRestaurants(response);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  

  const orders = [
  {
    id: "ORD1024",
    date: "2025-05-21",
    items: ["Paneer Butter Masala", "Butter Naan"],
    total: 320,
    status: "Delivered",
    paymentMethod: "UPI",
  },
  {
    id: "ORD1025",
    date: "2025-05-20",
    items: ["Chicken Biryani", "Coke"],
    total: 450,
    status: "Pending",
    paymentMethod: "Credit Card",
  },
];


const notifications = [
  {
    id: 1,
    title: "Order Delivered",
    message: "Your order #1432 has been successfully delivered.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Limited-Time Offer",
    message: "Get 20% off on your next order! Valid until tonight.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Order Accepted",
    message: "Your order #1432 has been accepted by Spice Grill.",
    time: "1 day ago",
    read: true,
  },
];


const customer = {
  name: "Majji Kiran",
  email: "majji@example.com",
  phone: "9876543210",
  address: "Plot 45, Hitech City, Hyderabad"
};
  
  return (
    <div>
      <Header />
      <section className="os-welcome-section">
        <div className="os-welcome-section-header">
          <div className="os-welcome-section-header-left">
            <h2 className="os-welcome-title">Welcome</h2>
            <p className="os-restaurant-name">Ramarao Kalinga</p> 
          </div>
        </div>

        <div className="os-stats-wrapper">
          <div className="os-stat-card">
            🏪 Total Restaurants
            <br />
            <strong>42</strong>
          </div>
          <div className="os-stat-card">
            👤 Total Users
            <br />
            <strong>3,240</strong>
          </div>
          <div className="os-stat-card">
            📦 Orders Today
            <br />
            <strong>895</strong>
          </div>
          <div className="os-stat-card">
            📅 Bookings Today
            <br />
            <strong>$45,200</strong>
          </div>
          <div className="os-stat-card">
            💰 Total Revenue
            <br />
            <strong>15</strong>
          </div>
          <div className="os-stat-card">
            ✉️ Support Messages
            <br />
            <strong>200</strong>
          </div>
        </div>
      </section>

      <section className="os-sections-grid">
        <Link className={`os-section-card-link`} to="/a-dashboard/restaurants">
          <div className={`os-section-card ${useLocation().pathname === "/a-dashboard/restaurants" && "c-active"}`}>🏪 Manage Restaurants</div>
        </Link>
        <Link className={`os-section-card-link`} to="/a-dashboard/users">
          <div className={`os-section-card ${useLocation().pathname === "/a-dashboard/users" && "c-active"}`}>👥 Manage Users</div>
        </Link>
        <Link className={`os-section-card-link`} to="/a-dashboard/orders">
          <div className={`os-section-card ${useLocation().pathname === "/a-dashboard/orders" && "c-active"}`}>📦 View Orders</div>
        </Link>
        <Link className={`os-section-card-link`} to="/a-dashboard/bookings">
          <div className={`os-section-card ${useLocation().pathname === "/a-dashboard/bookings" && "c-active"}`}>📅 View Bookings</div>
        </Link>
        <Link className={`os-section-card-link`} to="/a-dashboard/records">
          <div className={`os-section-card ${useLocation().pathname === "/a-dashboard/records" && "c-active"}`}>🧾 Billing Records</div>
        </Link>
        <Link className={`os-section-card-link`} to="/a-dashboard/reports">
          <div className={`os-section-card ${useLocation().pathname === "/a-dashboard/reports" && "c-active"}`}>📊 Generate Reports</div>
        </Link>
        <Link className={`os-section-card-link`} to="/a-dashboard/messages">
          <div className={`os-section-card ${useLocation().pathname === "/a-dashboard/messages" && "c-active"}`}>✉️ Support Messages</div>
        </Link>
        <Link className={`os-section-card-link`} to="/a-dashboard/settings">
          <div className={`os-section-card ${useLocation().pathname === "/a-dashboard/settings" && "c-active"}`}>⚙️ Admin Settings</div>
        </Link>
      </section>
      <Routes>
        <Route path="/orders" element={<MyOrdersPage orders={orders} />} />
        <Route path="/restaurants" element={<RestaurantsPage restaurants={restaurants} />} />
        <Route path="/users" element={<UsersPage users={users} />} />
        <Route path="/profile" element={<CustomerProfilePage customerData={customer} />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/notifications" element={<NotificationsPage notifications={notifications} />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
