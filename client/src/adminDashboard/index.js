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
import { getCookiesData } from "../utils/cookiesData";
import { getUserDetails } from "../api/authApi";

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const userId = getCookiesData().userId;
        const userDetails = await getUserDetails(userId);
        const response = await getRestaurants();
        const users = await getAllUsers();
        setRestaurants(response);
        setUserData(userDetails);
        console.log("User Details:", userDetails);
        
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
            <p className="os-restaurant-name">{userData.fullName} ({userData.role})</p> 
          </div>
        </div>

        <div className="os-stats-wrapper">
          <div className="os-stat-card">
            🏪 Total Restaurants
            <br />
            <strong>42</strong>
          </div>
          <div className="os-stat-card">choosava that is Ramarao
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
        <Link className={`os-section-card-link`} to="/dashboard/a-restaurants">
          <div className={`os-section-card ${useLocation().pathname === "/dashboard/a-restaurants" && "c-active"}`}>🏪 Manage Restaurants</div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/a-users">
          <div className={`os-section-card ${useLocation().pathname === "/dashboard/a-users" && "c-active"}`}>👥 Manage Users</div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/a-orders">
          <div className={`os-section-card ${useLocation().pathname === "/dashboard/a-orders" && "c-active"}`}>📦 View Orders</div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/a-bookings">
          <div className={`os-section-card ${useLocation().pathname === "/dashboard/a-bookings" && "c-active"}`}>📅 View Bookings</div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/a-records">
          <div className={`os-section-card ${useLocation().pathname === "/dashboard/a-records" && "c-active"}`}>🧾 Billing Records</div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/a-reports">
          <div className={`os-section-card ${useLocation().pathname === "/dashboard/a-reports" && "c-active"}`}>📊 Generate Reports</div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/a-messages">
          <div className={`os-section-card ${useLocation().pathname === "/dashboard/a-messages" && "c-active"}`}>✉️ Support Messages</div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/a-settings">
          <div className={`os-section-card ${useLocation().pathname === "/dashboard/a-settings" && "c-active"}`}>⚙️ Admin Settings</div>
        </Link>
      </section>
      <Routes>
        <Route path="/a-orders" element={<MyOrdersPage orders={orders} />} />
        <Route path="/a-restaurants" element={<RestaurantsPage restaurants={restaurants} />} />
        <Route path="/a-users" element={<UsersPage users={users} />} />
        <Route path="/a-profile" element={<CustomerProfilePage customerData={customer} />} />
        <Route path="/a-feedback" element={<FeedbackPage />} />
        <Route path="/a-notifications" element={<NotificationsPage notifications={notifications} />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
