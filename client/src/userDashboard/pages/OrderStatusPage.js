import React, { useEffect, useState } from "react";
import "../styles/OrderStatusPage.css";

const OrderStatusPage = ({ order }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [statusOverride, setStatusOverride] = useState(null); // Optional override after timer ends

  useEffect(() => {
    if (order.status !== "preparing") return;

    const targetTime = new Date(order.updated_at).getTime(); 

    const updateRemainingTime = () => {
      const now = new Date().getTime();
      const timeLeft = Math.max(Math.floor((targetTime - now) / 1000), 0);
      setRemainingTime(timeLeft);

      if (timeLeft <= 0) {
        setStatusOverride("ready");
      }
    };

    updateRemainingTime(); // Initial call
    const timer = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [order.updated_at, order.status]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const effectiveStatus = statusOverride || order.status;

  return (
    <div className="order-status-page-container">
      <div className="order-status-order-details">
        <h3>Order Summary</h3>
        <p>
          Your order for <strong>{order.food_name}</strong> costing{" "}
          <strong>{order.total_amount}</strong> has been received by{" "}
          <strong>{order.restaurant_name}</strong>. It will be delivered to{" "}
          <strong>{order.special_request}</strong>. The payment was made via{" "}
          <strong>Online</strong>.
        </p>
      </div>

      {effectiveStatus === "preparing" ? (
        <div className="order-status-preparing-section">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExanoxcjIwZ2FsYXlhMGt6a21pdmZlcWMzc3QzYTYxaWNzaHg4cTZvaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gg8Q0J4HD2rFm5LTHe/giphy.gif"
            alt="Preparing Order"
            className="order-status-preparing-animation"
          />
          <h2 className="order-status-heading">Your order is being prepared...</h2>
          <p className="order-status-message">
            Hang tight! Our chefs are crafting your delicious meal 🍽️
          </p>
          <p className="order-status-timer">
            ⏳ Your order will be ready in {formatTime(remainingTime)}
          </p>
        </div>
      ) : effectiveStatus === "ready" ? (
        <div className="order-status-general-section">
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWMybDZ2bnJnNnJueWJhbmRrMTltenFmY283MmtrcmR6Z2xjcHoxNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aD0mhLDPeW8tfig/giphy.gif"
            alt="Order Ready"
            className="order-status-preparing-animation"
          />
          <h2 className="order-status-heading">Order Ready</h2>
          <p className="order-status-message">
            Your food is ready for pickup or delivery!
          </p>
        </div>
      ) : effectiveStatus === "delivered" ? (
        <div className="order-status-general-section">
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnhvZTFiNDI4c2h2ZW9zN2NlZGcxZWIyamhqdHk2Z3hoYjVrZm5nNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2FnW3yZRJVZH2g/giphy.gif"
            alt="Delivered"
            className="order-status-preparing-animation"
          />
          <h2 className="order-status-heading">Order Delivered</h2>
          <p className="order-status-message">
            Your order has been delivered. Enjoy your meal! 😋
          </p>
          <button className="order-status-order-again-button">Order Again</button>
        </div>
      ) : (
        <div className="order-status-general-section">
          <h2 className="order-status-heading">Waiting For Confirmation</h2>
          <p className="order-status-message">
            Your order is being processed. Please wait for confirmation from the restaurant.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderStatusPage;
