import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { useState, useEffect } from "react";
import LogoutConfirm from "../LogoutConfirm";
import { FiMenu, FiX } from "react-icons/fi";
import { getUserDetails } from "../../api/authApi";
import { getCookiesData } from "../../utils/cookiesData";
import { TiLocationArrowOutline } from "react-icons/ti";
import { IoFastFoodOutline, IoNotificationsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiFeedbackLine } from "react-icons/ri";

const Header = () => {
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const [role, setRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookiesData = getCookiesData();
        const response = await getUserDetails(cookiesData.userId);
        setRole(cookiesData.role);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const isActive = (path) => (location.pathname === path ? "active" : "");
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const navLinks = {
    1: [
      { path: "/dashboard/a-restaurants", label: "Restaurants" },
      { path: "/dashboard/a-users", label: "Users" },
      { path: "/dashboard/a-orders", label: "Orders" },
      { path: "/dashboard/a-bookings", label: "Bookings" },
      { path: "/dashboard/a-records", label: "Records" },
      { path: "/dashboard/a-reports", label: "Reports" },
      { path: "/dashboard/a-messages", label: "Messages" },
      { path: "/dashboard/a-settings", label: "Settings" },
    ],
    2: [
      { path: "/dashboard/manage-menu", label: "Menu" },
      { path: "/dashboard/tables", label: "Tables" },
      { path: "/dashboard/bookings", label: "Bookings" },
      { path: "/dashboard/orders", label: "Orders" },
      { path: "/dashboard/billing", label: "Billing" },
      { path: "/dashboard/profile", label: "Profile" },
    ],
    3: [
      { path: "/dashboard/c-orders", label: "My Orders" },
      { path: "/dashboard/c-billing", label: "Billing" },
      { path: "/dashboard/c-transactions", label: "Transactions" },
    ],
  };

  return (
    <header className="os-dashboard-header">
      <div className="os-logo">
        <Link className="header-nav-link" to="/">Order Swift</Link>
      </div>

      <nav className={`os-nav ${menuOpen ? "open" : ""}`}>
        <div className="os-user-mobile-profile">
          <img
            src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
            alt="User Avatar"
            className="os-user-avatar"
          />
          <p>{userData?.fullName}</p>
        </div>

        <Link onClick={closeMenu} to="/dashboard" className={`order-nav-item ${isActive("/dashboard")}`}>
          Dashboard
        </Link>

        {navLinks[role]?.map(({ path, label }) => (
          <Link
            key={path}
            onClick={closeMenu}
            to={path}
            className={`order-nav-item ${isActive(path)}`}
          >
            {label}
          </Link>
        ))}

        <button
          onClick={() => setOpenLogoutConfirm(true)}
          className="os-logout-btn os-mobile-logout"
        >
          Logout
        </button>
      </nav>

      <div className="os-user-info-container os-desktop-logout">
        <div className="os-user-avatar-container" onClick={toggleDropdown}>
          <img
            src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
            alt="User Avatar"
            className="os-user-avatar"
          />
          <p>{userData?.fullName}</p>
        </div>

        <ul className={`os-user-info ${showDropdown ? "dropdown-show" : ""}`}>
          <li><TiLocationArrowOutline size={24} /> <Link className="user-os-nav-link" to="/dashboard/c-status"> Track Your Order</Link></li>
          <li><IoFastFoodOutline size={24} /> Current Orders</li>
          <li><CgProfile size={24} /> Profile</li>
          <li><IoNotificationsSharp size={24} /> Notifications</li>
          <li><RiFeedbackLine size={24} /> Feedback</li>
          <li>
            <button
              onClick={() => setOpenLogoutConfirm(true)}
              className="user-os-logout-btn"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="os-header-right">
        <button className="os-menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {menuOpen && <div className="os-nav-backdrop" onClick={closeMenu} />}
      {openLogoutConfirm && <LogoutConfirm onClose={() => setOpenLogoutConfirm(false)} />}
    </header>
  );
};

export default Header;
