import React, { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import "../styles/OrdersPage.css";
import { updateOrderStatus } from "../../api/orderApi";

const OrdersPage = ({ orders }) => {
  const [localOrders, setLocalOrders] = useState([]);
  const [estimatedTimes, setEstimatedTimes] = useState({});

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleAction = async (orderId, currentStatus) => {
    let newStatus = "";
    const estimatedTime = estimatedTimes[orderId];

    switch (currentStatus.toLowerCase()) {
      case "pending":
        if (!estimatedTime) {
          alert("Please enter estimated time for delivery.");
          return;
        }
        newStatus = "preparing";
        break;
      case "preparing":
        newStatus = "ready";
        break;
      case "ready":
        newStatus = "delivered";
        break;
      default:
        alert("No further status update possible.");
        return;
    }

    const updated = await updateOrderStatus(orderId, {
      status: newStatus,
      ...(newStatus === "preparing" && { estimatedTime }),
    });

    if (updated) {
      alert(`Order status updated to '${newStatus}' successfully!`);
      setLocalOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      if (newStatus === "preparing") {
        setEstimatedTimes((prev) => ({ ...prev, [orderId]: "" }));
      }
    } else {
      alert("Failed to update order status. Please try again.");
    }
  };

  const getStatusButtonLabel = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Confirm Order";
      case "preparing":
        return "Order Ready";
      case "ready":
        return "Mark as Delivered";
      case "delivered":
        return "View Order Details";
      default:
        return "Update";
    }
  };

  return (
    <div className="os-dashboard-container">
      <section className="os-welcome-section">
        <h2 className="os-welcome-title">Manage Orders</h2>
        <p className="os-restaurant-name">Spicy Bite Restaurant</p>
        <div className="os-stats-wrapper">
          <div className="os-stat-card">
            🧾 Total Orders
            <br />
            <strong>{orders.length}</strong>
          </div>
          <div className="os-stat-card">
            ✅ Delivered
            <br />
            <strong>
              {
                orders.filter((o) => o.status.toLowerCase() === "delivered")
                  .length
              }
            </strong>
          </div>
          <div className="os-stat-card">
            🍳 Preparing
            <br />
            <strong>
              {
                orders.filter((o) => o.status.toLowerCase() === "preparing")
                  .length
              }
            </strong>
          </div>
        </div>
      </section>

      <section className="os-bookings-table">
        <h3 style={{ marginBottom: "10px" }}>All Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Address</th>
              <th>Enter Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {localOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_name}</td>
                <td>{order.food_name}</td>
                <td>{order.total_amout}</td>
                <td className="os-address-cell">{order.special_request}</td>
                <td>
                  {order.status.toLowerCase() === "delivered" ? (
                    <span className="os-delivered-msg">
                      Delivered, Thank You
                    </span>
                  ) : order.status.toLowerCase() === "ready" ? (
                    <span className="os-wait-msg">Wait for Deliver Order</span>
                  ) : (
                    <input
                      className="os-time-input"
                      type="number"
                      placeholder="Minutes"
                      value={estimatedTimes[order.id] || ""}
                      onChange={(e) =>
                        setEstimatedTimes({
                          ...estimatedTimes,
                          [order.id]: e.target.value,
                        })
                      }
                    />
                  )}
                </td>
                <td className="os-action-buttons">
                  <button
                    className="os-action-btn"
                    onClick={() => handleAction(order.id, order.status)}
                  >
                    {getStatusButtonLabel(order.status)}
                  </button>
                  <button className="os-action-link-btn">
                    <a
                      className="os-action-btn-link"
                      target="_blank"
                      href={`https://www.google.com/maps?q=${
                        JSON.parse(order.location).lat
                      },${JSON.parse(order.location).lng}`}
                      rel="noopener noreferrer"
                    >
                      <FaLocationArrow />
                    </a>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OrdersPage;
