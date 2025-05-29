import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { useState, useEffect } from "react";
import LogoutConfirm from "../LogoutConfirm";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const [role, setRole] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch {
        setRole("");
      }
    }
  }, []);

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <header className="os-dashboard-header">
      <div className="os-logo">
        <Link className="header-nav-link" to="/">Order Swift</Link>
      </div>

      <nav className="os-nav">
        <Link to="/dashboard" className={`order-nav-item ${isActive("/dashboard")}`}>
          Dashboard
        </Link>

        {/* Restaurant Owner Links */}
        {role === 2 && (
          <>
            <Link to="/dashboard/manage-menu" className={`order-nav-item ${isActive("/dashboard/manage-menu")}`}>Menu</Link>
            <Link to="/dashboard/tables" className={`order-nav-item ${isActive("/dashboard/tables")}`}>Tables</Link>
            <Link to="/dashboard/bookings" className={`order-nav-item ${isActive("/dashboard/bookings")}`}>Bookings</Link>
            <Link to="/dashboard/orders" className={`order-nav-item ${isActive("/dashboard/orders")}`}>Orders</Link>
            <Link to="/dashboard/billing" className={`order-nav-item ${isActive("/dashboard/billing")}`}>Billing</Link>
            <Link to="/dashboard/profile" className={`order-nav-item ${isActive("/dashboard/profile")}`}>Profile</Link>
          </>
        )}

        {/* Customer Links */}
        {role === 3 && (
          <>
            <Link to="/dashboard/c-orders" className={`order-nav-item ${isActive("/dashboard/c-orders")}`}>My Orders</Link>
            <Link to="/dashboard/c-billing" className={`order-nav-item ${isActive("/dashboard/c-billing")}`}>Billing</Link>
            <Link to="/dashboard/c-transactions" className={`order-nav-item ${isActive("/dashboard/c-transactions")}`}>Transactions</Link>
            <Link to="/dashboard/c-profile" className={`order-nav-item ${isActive("/dashboard/c-profile")}`}>Profile</Link>
            <Link to="/dashboard/c-feedback" className={`order-nav-item ${isActive("/dashboard/c-feedback")}`}>Feedback</Link>
            <Link to="/dashboard/c-notifications" className={`order-nav-item ${isActive("/dashboard/c-notifications")}`}>Notifications</Link>
          </>
        )}

        {/* Admin Links */}
        {role === 1 && (
          <>
            <Link to="/dashboard/a-restaurants" className={`order-nav-item ${isActive("/dashboard/a-restaurants")}`}>Restaurants</Link>
            <Link to="/dashboard/a-users" className={`order-nav-item ${isActive("/dashboard/a-users")}`}>Users</Link>
            <Link to="/dashboard/a-orders" className={`order-nav-item ${isActive("/dashboard/a-orders")}`}>Orders</Link>
            <Link to="/dashboard/a-bookings" className={`order-nav-item ${isActive("/dashboard/a-bookings")}`}>Bookings</Link>
            <Link to="/dashboard/a-records" className={`order-nav-item ${isActive("/dashboard/a-records")}`}>Records</Link>
            <Link to="/dashboard/a-reports" className={`order-nav-item ${isActive("/dashboard/a-reports")}`}>Reports</Link>
            <Link to="/dashboard/a-messages" className={`order-nav-item ${isActive("/dashboard/a-messages")}`}>Messages</Link>
            <Link to="/dashboard/a-settings" className={`order-nav-item ${isActive("/dashboard/a-settings")}`}>Settings</Link>
          </>
        )}
      </nav>

      <button onClick={() => setOpenLogoutConfirm(true)} className="os-logout-btn">
        Logout
      </button>

      {openLogoutConfirm && <LogoutConfirm onClose={() => setOpenLogoutConfirm(false)} />}
    </header>
  );
};

export default Header;
