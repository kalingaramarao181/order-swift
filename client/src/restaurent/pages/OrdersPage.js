import React, { useState, useEffect } from 'react';
import '../styles/OrdersPage.css';
import { getOrdersByRestaurantId } from '../../api/orderApi';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Convert lat,lng to address
  const getAddressFromCoords = async (lat, lng) => {
    const apiKey = "AIzaSyDpQYynPI5mi2WKRjpElTO5epXqPcvATBk";
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        return data.results[0]?.formatted_address || 'Unknown address';
      }
      return 'Unknown address';
    } catch (error) {
      console.error('Geocoding error:', error);
      return 'Unknown address';
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrdersByRestaurantId(3);

      const updatedOrders = await Promise.all(
        response.map(async (order) => {
          let address = 'Invalid location';
          try {
            const location = JSON.parse(order.location);
            address = await getAddressFromCoords(location.lat, location.lng);
          } catch (err) {
            console.error('Location parse error:', err);
          }
          return { ...order, address };
        })
      );

      setOrders(updatedOrders);
    };

    fetchOrders();
  }, []);

  const handleAction = (action, id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status:
                action === 'Delivered'
                  ? 'Delivered'
                  : action === 'Cancel'
                  ? 'Cancelled'
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
        {orders.map((order) => (
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
