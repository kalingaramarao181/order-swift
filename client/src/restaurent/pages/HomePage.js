import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

const RestaurantDashboardHomePage = () => {
  return (
    <div className="os-dashboard-container">
      <section className="os-welcome-section">
        <h2 className="os-welcome-title">Welcome back</h2>
        <p className="os-restaurant-name">Spicy Bite Restaurant</p>
        <div className="os-stats-wrapper">
          <div className="os-stat-card">
            🍽 Orders Today
            <br />
            <strong>18</strong>
          </div>
          <div className="os-stat-card">
            📅 Bookings
            <br />
            <strong>7</strong>
          </div>
          <div className="os-stat-card">
            💰 Revenue
            <br />
            <strong>$920</strong>
          </div>
        </div>
      </section>

      <section className="os-sections-grid">
        <Link className="os-section-card-link" to="/dashboard/manage-menu">
          <div className="os-section-card">📋 Manage Menu</div>
        </Link>
        <Link className="os-section-card-link" to="/dashboard/tables">
          <div className="os-section-card">🍴 Manage Tables</div>
        </Link>
        <Link className="os-section-card-link" to="/dashboard/bookings">
          <div className="os-section-card">📆 View Bookings</div>
        </Link>
        <Link className="os-section-card-link" to="/dashboard/orders">
          <div className="os-section-card">🧾 Orders List</div>
        </Link>
        <Link className="os-section-card-link" to="/dashboard/billing">
          <div className="os-section-card">💳 Billing Records</div>
        </Link>
        <Link className="os-section-card-link" to="/dashboard/profile">
          <div className="os-section-card">⚙️ Profile Settings</div>
        </Link>
      </section>
    </div>
  );
};

export default RestaurantDashboardHomePage;
