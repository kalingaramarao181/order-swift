import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import LogoutConfirm from "../LogoutConfirm";


const Header = () => {
    const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  return (
    <header className="os-dashboard-header">
      <div className="os-logo">Order Swift</div>
      <nav className="os-nav">
        <Link to="/dashboard" className={`order-nav-item ${useLocation().pathname === "/dashboard" && "active"}`}>Dashboard</Link>
        <Link to="/dashboard/manage-menu" className={`order-nav-item ${useLocation().pathname === "/dashboard/manage-menu" && "active"}`}>Menu</Link>
        <Link to="/dashboard/tables" className={`order-nav-item ${useLocation().pathname === "/dashboard/tables" && "active"}`}>Tables</Link>
        <Link to="/dashboard/bookings" className={`order-nav-item ${useLocation().pathname === "/dashboard/bookings" && "active"}`}>Bookings</Link>
        <Link to="/dashboard/orders" className={`order-nav-item ${useLocation().pathname === "/dashboard/orders" && "active"}`}>Orders</Link>
        <Link to="/dashboard/billing" className={`order-nav-item ${useLocation().pathname === "/dashboard/billing" && "active"}`}>Billing</Link>
        <Link to="/dashboard/profile" className={`order-nav-item ${useLocation().pathname === "/dashboard/profile" && "active"}`}>Profile</Link>
      </nav>
      <button onClick={() => setOpenLogoutConfirm(true)} className="os-logout-btn">Logout</button>
      {openLogoutConfirm && <LogoutConfirm onClose={() => setOpenLogoutConfirm(false)} />}
    </header>
  );
};

export default Header;
