import React, { useState } from 'react';
import '../styles/OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    { id: 101, customer: 'Alice', items: 3, amount: 28.5, time: '12:30 PM', status: 'Preparing' },
    { id: 102, customer: 'Mark', items: 2, amount: 15.0, time: '1:15 PM', status: 'Delivered' },
    { id: 103, customer: 'Sophie', items: 4, amount: 40.25, time: '1:45 PM', status: 'Cancelled' },
  ]);

  const handleAction = (action, id) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, status: action === 'Delivered' ? 'Delivered' : action === 'Cancel' ? 'Cancelled' : order.status }
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
  {orders.map(order => (
    <div className={`os-order-card ${order.status.toLowerCase()}`} key={order.id}>
      <div className="os-order-top">
        <div className="os-order-id"># {order.id}</div>
        <div className={`os-order-status ${order.status.toLowerCase()}`}>{order.status}</div>
      </div>
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Items:</strong> {order.items}</p>
      <p><strong>Total:</strong> ${order.amount.toFixed(2)}</p>
      <p><strong>Time:</strong> {order.time}</p>
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
