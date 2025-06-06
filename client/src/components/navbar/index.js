import React, { useState } from "react";
import "./index.css";
import LoginForm from "../../forms/loginForm";
import { MdClose } from "react-icons/md";
import PasswordUpdate from "../../forms/PasswordUpdateForm";
import RegisterForm from "../../forms/registerForm";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import LogoutConfirm from "../LogoutConfirm";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isShowUpdatePasswordForm, setIsShowUpdatePasswordForm] =
    useState(false);
  const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);


  const token = Cookies.get("jwtToken");

  const handleLoginClick = (role) => {
    setUserRole(role);
    setShowLogin(true);
    setIsShowUpdatePasswordForm(false);
    setIsShowRegisterForm(false);
  };

  const closePopup = () => {
    setShowLogin(false);
    setIsShowUpdatePasswordForm(false);
    setIsShowRegisterForm(false);
  };

  const backToLogin = () => {
    setIsShowUpdatePasswordForm(false);
    setIsShowRegisterForm(false);
  };

  return (
    <header className="swiggy-header">
      <div className="swiggy-logo">
        <img src="" className="" alt="" />
        <Link className="header-nav-link" to="/">
          {" "}
          OrderSwift
        </Link>
      </div>
      {!token ? (
        <nav className="swiggy-nav">
          <a href="#order">Sign in as a</a>
          <button
            className="app-button"
            onClick={() => handleLoginClick("Restaurant")}
          >
            Restaurant
          </button>
          <button
            className="sign-in-button"
            onClick={() => handleLoginClick("Customer")}
          >
            Customer
          </button>
        </nav>
      ) : (
        <nav className="swiggy-nav">
          <Link className="header-nav-link" to="/dashboard">
            <button
              className="app-button"
              onClick={() => handleLoginClick("Restaurant")}
            >
              Dashboard
            </button>
          </Link>

          <button
            className="sign-in-button"
            onClick={() => setOpenLogoutConfirm(true)}
          >
            Logout
          </button>
        </nav>
      )}

      {showLogin && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <button className="order-login-close-button" onClick={closePopup}>
              <MdClose />
            </button>

            {!isShowUpdatePasswordForm && !isShowRegisterForm && (
              <div className="order-login-page">
                <LoginForm role={userRole} onClose={closePopup} />
                <p
                  onClick={() => setIsShowUpdatePasswordForm(true)}
                  className="order-login-forgot-password"
                >
                  Forgot Password?
                </p>
                <p className="order-login-signup">
                  Don't have an account?
                  <span onClick={() => setIsShowRegisterForm(true)}>
                    {" "}
                    Sign Up{" "}
                  </span>
                </p>
              </div>
            )}

            {isShowUpdatePasswordForm && (
              <div className="order-login-page">
                <PasswordUpdate />
                <p
                  onClick={backToLogin}
                  className="order-login-forgot-password keep-signing-in"
                >
                  Keep Signing in
                </p>
              </div>
            )}

            {isShowRegisterForm && (
              <div className="order-login-page">
                <RegisterForm role={userRole} />
                <p
                  onClick={backToLogin}
                  className="order-login-forgot-password keep-signing-in"
                >
                  Back to Login
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {openLogoutConfirm && <LogoutConfirm onClose={() => setOpenLogoutConfirm(false)} />}
    </header>
  );
};

export default Navbar;
