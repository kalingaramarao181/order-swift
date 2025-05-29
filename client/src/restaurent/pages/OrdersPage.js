import React, { useState, useEffect } from 'react';
import '../styles/OrdersPage.css';

const OrdersPage = ({orders}) => {
const [localOrders, setLocalOrders] = useState([]);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleAction = (action, id) => {
    setLocalOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status:
                action === "Delivered"
                  ? "Delivered"
                  : action === "Cancel"
                  ? "Cancelled"
                  : order.status,
            }
          : order
      )
    );
  };

  return (
    <div className="os-dashboard-container">
      <section className="os-welcome-section">
        <h2 className="os-welcome-title">Manage Orders</h2>
        <p className="os-restaurant-name">Spicy Bite Restaurant</p>
        <div className="os-stats-wrapper">
          <div className="os-stat-card">🧾 Total Orders<br /><strong>{orders.length}</strong></div>
          <div className="os-stat-card">✅ Delivered<br /><strong>{orders.filter(o => o.status === 'Delivered').length}</strong></div>
          <div className="os-stat-card">🍳 Preparing<br /><strong>{orders.filter(o => o.status === 'Preparing').length}</strong></div>
        </div>
      </section>

      <section className="os-sections-grid">
        <div className="os-section-card">📋 View All Orders</div>
        <div className="os-section-card">📦 Mark as Delivered</div>
        <div className="os-section-card">❌ Cancel Order</div>
        <div className="os-section-card">📊 Order Analytics</div>
        <div className="os-section-card">🔔 Notifications</div>
        <div className="os-section-card">⬇️ Export Orders</div>
      </section>

      <section className="os-cards-list">
        {localOrders.map((order) => (
          <div className={`os-order-card ${order.status.toLowerCase()}`} key={order.id}>
            <div className="os-order-top">
              <div className="os-order-id"># {order.id}</div>
              <div className={`os-order-status ${order.status.toLowerCase()}`}>{order.status}</div>
            </div>
            <p><strong>Customer:</strong> {order.user_name}</p>
            <p><strong>Items:</strong> {order.food_name}</p>
            <p><strong>Total:</strong> ${order.total_amout}</p>
            <p><strong>Time:</strong> {order.time}</p>
            <p><strong>Address:</strong> <a target="_blank" href={`https://www.google.com/maps?q=${JSON.parse(order.location).lat},${JSON.parse(order.location).lng}`} rel="noopener noreferrer">Show Location</a></p>
            <div className="os-order-actions">
              <button className="os-action-btn" onClick={() => alert(`Viewing Order #${order.id}`)}>View</button>
              {order.status === 'Preparing' && (
                <>
                  <button className="os-action-btn" onClick={() => handleAction('Delivered', order.id)}>Deliver</button>
                  <button className="os-action-btn" onClick={() => handleAction('Cancel', order.id)}>Cancel</button>
                </>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OrdersPage;
