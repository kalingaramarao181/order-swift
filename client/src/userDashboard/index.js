import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import "../restaurent/styles/HomePage.css";
import BillingPage from "./pages/BillingPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import TransactionsTable from "./pages/TransactionsPage";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import { getCookiesData } from "../utils/cookiesData";
import { getUserDetails } from "../api/authApi";
import FeedbackPage from "./pages/FeedbackPage";
import NotificationsPage from "./pages/NotificationsPage";
import CustomerHome from "./pages/CustomerHome";
import OrderStatusPage from "./pages/OrderStatusPage";

const UserDashboard = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookiesData = getCookiesData();
        if (cookiesData) {
          const userId = cookiesData.userId;
          const response = await getUserDetails(userId);
          setUserData(response);
          console.log("User Data:", response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
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

  const transactions = [
    {
      id: 1,
      date: "2025-05-21",
      restaurant: "Spice on Wheels",
      amount: 499,
      method: "UPI",
      status: "Success",
    },
    {
      id: 2,
      date: "2025-05-20",
      restaurant: "Masala Treat",
      amount: 899,
      method: "Credit Card",
      status: "Failed",
    },
  ];

  const orderDetails ={
  item: "Paneer Biryani",
  totalPrice: "₹320",
  address: "D/O:39-19-13, Madhavadhara, Visakhapatnam - 530007",
  restaurant: "Spice Garden",
  paymentMode: "Online",
  estimatedTime: 10, 
  orderTime: "2025-06-03T22:03:08.587Z"
  // new Date().toISOString() 
};

console.log("Order Details:", orderDetails.orderTime);


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

  const bills = [
    {
      id: 1,
      date: "2025-05-20",
      restaurant: "Spice on Wheels",
      totalAmount: 500,
      discount: 10,
      finalAmount: 450,
    },
    {
      id: 2,
      date: "2025-05-19",
      restaurant: "Masala Treat",
      totalAmount: 800,
      discount: 5,
      finalAmount: 760,
    },
  ];

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/c-feedback" element={<FeedbackPage />} />
        <Route path="/c-billing" element={<BillingPage bills={bills} />} />
        <Route path="/c-orders" element={<MyOrdersPage orders={orders} />} />
        <Route path="/c-profile" element={<CustomerProfilePage customerData={userData} />} />
        <Route path="/c-transactions" element={<TransactionsTable transactions={transactions} />} />
        <Route path="/c-notifications" element={<NotificationsPage notifications={notifications} />} />
        <Route path="/c-status" element={<OrderStatusPage status={"delivered"} order={orderDetails} />} />
      </Routes> 
    </div>
  );
};

export default UserDashboard;
