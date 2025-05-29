import { Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import "../restaurent/styles/HomePage.css";
import BillingPage from "./pages/BillingPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import TransactionsTable from "./pages/TransactionsPage";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import FeedbackPage from "./pages/FeedbackPage";
import NotificationsPage from "./pages/NotificationsPage";

const UserDashboard = () => {
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

  const customer = {
    name: "Majji Kiran",
    email: "majji@example.com",
    phone: "9876543210",
    address: "Plot 45, Hitech City, Hyderabad",
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
            🧾 Orders Placed
            <br />
            <strong>500</strong>
          </div>
          <div className="os-stat-card">
            💳 Total Spent
            <br />
            <strong>$500</strong>
          </div>
          <div className="os-stat-card">
            ⭐ Loyalty Points
            <br />
            <strong>200</strong>
          </div>
        </div>
      </section>

      <section className="os-sections-grid">
        <Link className={`os-section-card-link`} to="/dashboard/c-orders">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-orders" && "c-active"
            }`}
          >
            🧾 My Orders
          </div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/c-billing">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-billing" && "c-active"
            }`}
          >
            💰 Billing
          </div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/c-transactions">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-transactions" &&
              "c-active"
            }`}
          >
            📄 Transactions
          </div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/c-profile">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-profile" && "c-active"
            }`}
          >
            👤 Profile
          </div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/c-feedback">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-feedback" && "c-active"
            }`}
          >
            💬 Feedback
          </div>
        </Link>
        <Link
          className={`os-section-card-link`}
          to="/dashboard/c-notifications"
        >
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-notifications" &&
              "c-active"
            }`}
          >
            🔔 Notifications
          </div>
        </Link>
      </section>
      <Routes>
        <Route path="/c-orders" element={<MyOrdersPage orders={orders} />} />
        <Route path="/c-billing" element={<BillingPage bills={bills} />} />
        <Route
          path="/c-transactions"
          element={<TransactionsTable transactions={transactions} />}
        />
        <Route
          path="/c-profile"
          element={<CustomerProfilePage customerData={customer} />}
        />
        <Route path="/c-feedback" element={<FeedbackPage />} />
        <Route
          path="/c-notifications"
          element={<NotificationsPage notifications={notifications} />}
        />
      </Routes>
    </div>
  );
};

export default UserDashboard;
