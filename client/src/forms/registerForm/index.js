import React, { useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { sendOtp, verifyOtp, registerUser } from "../../api/authApi";

const RegisterForm = ({ isPopupOpen, closePopup, role }) => {
  const [formData, setFormData] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!validateEmail() || !validatePasswords()) return;
    if (isOtpSent)
      return setErrorMessage("OTP already sent. Please check your email.");

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: 3,
      };

      const response = await sendOtp(payload);

      Cookies.set("otpToken", response.data.token, { expires: 5 / (24 * 60) });
      setIsOtpSent(true);
      console.log("OTP sent to your email!");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        console.log(error.response.status);
      } else {
        console.error("Error sending OTP", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6)
      return toast.error("Please enter the full OTP.");

    setLoading(true);
    try {
      const response = await verifyOtp(
        formData.email,
        otp,
        Cookies.get("otpToken")
      );

      Cookies.set("registerToken", response.registerToken, {
        expires: 10 / (24 * 60),
      });

      await registerUser({
        ...formData,
        role: 3,
        token: response.registerToken,
      });

      setShowSuccessPopup(true);
    } catch (error) {
      if (error.status === 401) {
        setErrorMessage("Invalid OTP. Please try again.");

        setIsOtpSent(false);
      } else {
        setErrorMessage(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    window.location.reload();
  };

  return (
    <>
      <h2 className="order-signup-heading">Sign Up</h2>
      <form
        className="oreder-login-form"
        onSubmit={!isOtpSent ? handleSendOtp : handleVerifyOtp}
      >
        <label className="order-login-label">Name</label>
        <input
          type="text"
          className="order-login-input"
          placeholder="Enter your name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <label className="order-login-label">Email</label>
        <input
          type="email"
          className="order-login-input"
          placeholder="Enter your email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <label className="order-login-label">Phone Number</label>
        <input
          type="text"
          className="order-login-input"
          placeholder="Enter your phone number"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <label className="order-login-label">Password</label>
        <input
          type="password"
          className="order-login-input"
          placeholder="Enter your password"
          value={formData.password || ""}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <label className="order-login-label">Confirm Password</label>
        <input
          type="password"
          className="order-login-input"
          placeholder="Confirm your password"
          value={formData.confirmPassword || ""}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
        />

        {isOtpSent && (
          <div className="signup-otp-container">
            <input
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="order-login-input"
            />
          </div>
        )}

        <button
          type="submit"
          className="login-popup-login-button"
          disabled={loading}
        >
          {loading
            ? isOtpSent
              ? "Verifying..."
              : "Sending..."
            : isOtpSent
            ? "Verify OTP"
            : "Send OTP"}
        </button>
        {errorMessage && <p className="order-error-message">{errorMessage}</p>}
      </form>

      {/* Success Popup after successful registration */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-popup-header-container">
            <p>Registration successful!</p>
            <button onClick={handleSuccessPopupClose}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
