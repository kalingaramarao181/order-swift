import React, { useState, useRef } from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { baseUrl } from "../../config/constants";

const RestaurantDashboardHomePage = ({ restaurantDetails }) => {
  const [isOpenQrCode, setIsOpenQrCode] = useState(false);
  const qrRef = useRef(null);
  const qrLink = `${baseUrl}${restaurantDetails.id}`;


  const handleDownload = () => {
    if (qrRef.current === null) return;

    toPng(qrRef.current)
      .then((dataUrl) => {
        saveAs(dataUrl, `${restaurantDetails.name}-qr.png`);
      })
      .catch((err) => {
        console.error("QR code download failed", err);
      });
  };

  const handleShare = async () => {
    if (navigator.share && qrRef.current) {
      try {
        const blob = await toPng(qrRef.current).then((dataUrl) =>
          fetch(dataUrl).then((res) => res.blob())
        );

        const file = new File([blob], `${restaurantDetails.name}-qr.png`, {
          type: blob.type,
        });

        await navigator.share({
          title: restaurantDetails.name,
          text: `Scan this QR code to view the restaurant: ${qrLink}`,
          files: [file],
        });
      } catch (err) {
        console.error("Sharing failed", err);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };
  return (
    <div className="os-dashboard-container">
      <section className="os-welcome-section">
        <div className="os-welcome-section-header">
          <div className="os-welcome-section-header-left">
            <h2 className="os-welcome-title">Welcome back</h2>
            <p className="os-restaurant-name">{restaurantDetails.name}</p>
          </div>
          <button
            onClick={() => setIsOpenQrCode(true)}
            className="os-qr-code-button"
          >
            Generate QR Code
          </button>
        </div>
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

      {isOpenQrCode && (
        <div className="login-popup-overlay">
      <div className="login-popup">
        <button
          className="order-login-close-button"
          onClick={() => setIsOpenQrCode(false)}
        >
          <MdClose />
        </button>
        <div className="order-login-page">
          <div ref={qrRef} className="qr-code-container" style={{ background: "white", padding: "16px" }}>
          <h1 className="os-welcome-title">{restaurantDetails.name}</h1>
            <QRCode value={qrLink} size={200} />
            <p style={{ textAlign: "center", marginTop: "10px" }}>Scan this QR code to visit my restaurant</p>
          </div>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button className="os-qr-code-button" onClick={handleDownload}>Download QR</button>
            <button className="os-qr-code-button" onClick={handleShare}>Share QR</button>
          </div>
        </div>
      </div>
    </div>
      )}
    </div>
  );
};

export default RestaurantDashboardHomePage;
