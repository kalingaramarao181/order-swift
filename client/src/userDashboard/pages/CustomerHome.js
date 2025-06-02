
import { Link, useLocation } from "react-router-dom";

const CustomerHome = () => {
    return (
        <>
        <section className="os-welcome-section">

        <div className="os-stats-wrapper">
          <div className="os-stat-card">
            🧾 Orders Placed
            <br />
            <strong>500</strong>
          </div>
          <div className="os-stat-card">
            💳 Total Spent
            <br />
            <strong>$500</strong>
          </div>
          <div className="os-stat-card">
            ⭐ Loyalty Points
            <br />
            <strong>200</strong>
          </div>
        </div>
      </section>

      <section className="os-sections-grid">
        <Link className={`os-section-card-link`} to="/dashboard/c-orders">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-orders" && "c-active"
            }`}
          >
            🧾 My Orders
          </div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/c-billing">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-billing" && "c-active"
            }`}
          >
            💰 Billing
          </div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/c-transactions">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-transactions" &&
              "c-active"
            }`}
          >
            📄 Transactions
          </div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/c-profile">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-profile" && "c-active"
            }`}
          >
            👤 Profile
          </div>
        </Link>
        <Link className={`os-section-card-link`} to="/dashboard/c-feedback">
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-feedback" && "c-active"
            }`}
          >
            💬 Feedback
          </div>
        </Link>
        <Link
          className={`os-section-card-link`}
          to="/dashboard/c-notifications"
        >
          <div
            className={`os-section-card ${
              useLocation().pathname === "/dashboard/c-notifications" &&
              "c-active"
            }`}
          >
            🔔 Notifications
          </div>
        </Link>
      </section>
      </>
    );
}

export default CustomerHome;