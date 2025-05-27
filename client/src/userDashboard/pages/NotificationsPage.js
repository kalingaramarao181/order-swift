import React, { useState, useEffect } from "react";
import "../styles/NotificationsPage.css";
import { FaBell, FaClock } from "react-icons/fa";

const NotificationsPage = ({ notifications: initialNotifications }) => {
  // Local state to handle read/unread updates
  const [notifications, setNotifications] = useState([]);

  // Initialize local notifications state from props
  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="customer-notifications-container">
      <div className="customer-notifications-header">
        <h2>
          <FaBell /> Notifications
        </h2>
        <button onClick={markAllAsRead} className="mark-all-btn">
          Mark All as Read
        </button>
      </div>

      <div className="customer-notifications-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications yet.</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`customer-notification-item ${
                notif.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="notif-header">
                <h4>{notif.title}</h4>
                <span className="notif-time">
                  <FaClock /> {notif.time}
                </span>
              </div>
              <p>{notif.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
