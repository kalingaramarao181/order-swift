import React from 'react';
import './index.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dash-container">
      <header className="admin-dash-header">
        <div className="admin-dash-logo">Order Swift</div>
        <nav className="admin-dash-nav">
          <a href="#1">Dashboard</a>
          <a href="#2">Restaurants</a>
          <a href="#3">Users</a>
          <a href="#4">Orders</a>
          <a href="#5">Bills</a>
          <a href="#6">Bookings</a>
          <a href="#7">Messages</a>
          <a href="#8">Reports</a>
          <a href="#9">Settings</a>
        </nav>
        <button className="admin-dash-logout">Logout</button>
      </header>

      <section className="admin-dash-welcome">
        <h2>Welcome back</h2>
        <p>Super Admin</p>
      </section>

      <section className="admin-dash-stats">
        {[
          { icon: '🏪', label: 'Total Restaurants', value: '42' },
          { icon: '👤', label: 'Total Users', value: '3,240' },
          { icon: '📦', label: 'Orders Today', value: '895' },
          { icon: '📅', label: 'Bookings Today', value: '134' },
          { icon: '💰', label: 'Total Revenue', value: '$45,200' },
          { icon: '✉️', label: 'Support Messages', value: '15' },
        ].map((item, i) => (
          <div key={i} className="admin-dash-card">
            <span className="admin-dash-icon">{item.icon}</span>
            <div>
              <p>{item.label}</p>
              <h3>{item.value}</h3>
            </div>
          </div>
        ))}
      </section>

      <section className="admin-dash-actions">
        {[
          '🏪 Manage Restaurants',
          '👥 Manage Users',
          '📦 View Orders',
          '📅 View Bookings',
          '🧾 Billing Records',
          '📊 Generate Reports',
          '✉️ Support Messages',
          '⚙️ Admin Settings',
        ].map((label, i) => (
          <button key={i} className="admin-dash-action-btn">{label}</button>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
