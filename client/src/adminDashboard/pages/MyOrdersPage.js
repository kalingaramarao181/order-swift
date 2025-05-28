import React from "react";
import "../styles/MyOrdersPage.css";
import { FaRupeeSign } from "react-icons/fa";

const MyOrdersTable = ({ orders }) => {
  return (
    <div className="myorders-container">
      <h2 className="myorders-heading">📋 My Orders</h2>

      {orders.length > 0 ? (
        <div className="myorders-table-wrapper">
          <table className="myorders-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order.id}>
                  <td>{idx + 1}</td>
                  <td>{order.date}</td>
                  <td>
                    {order.items.length > 2
                      ? `${order.items.slice(0, 2).join(", ")} +${order.items.length - 2} more`
                      : order.items.join(", ")}
                  </td>
                  <td>
                    <FaRupeeSign />
                    {order.total}
                  </td>
                  <td>
                    <span className={`myorders-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <button className="myorders-btn-outline">View</button>
                    <button className="myorders-btn-primary">Track</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="myorders-empty">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrdersTable;
