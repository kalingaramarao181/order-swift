import React, { useState, useEffect } from "react";
import "../styles/CustomerProfilePage.css";
import { FaUserEdit, FaSave } from "react-icons/fa";

const CustomerProfilePage = ({ customerData }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (customerData) {
      setProfile(customerData);
    }
  }, [customerData]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = () => {
    setIsEditing(false);
    // Send updated profile to backend if needed
    console.log("Updated Profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="customer-profile-container">
      <h2 className="customer-profile-title">👤 My Profile</h2>

      <div className="customer-profile-card"> 
        <div className="customer-profile-photo-section">
          <img
            src="https://i.ibb.co/sbKf3rp/user-avatar.png"
            alt="User Avatar"
            className="customer-profile-avatar"
          />
        </div>

        <div className="customer-profile-details">
          <div className="customer-profile-field">
            <label>Name</label>
            <input
              name="name"
              value={profile.fullName}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>
          <div className="customer-profile-field">
            <label>Email</label>
            <input
              name="email"
              value={profile.email}
              disabled
            />
          </div>
          <div className="customer-profile-field">
            <label>Phone</label>
            <input
              name="phone"
              value={profile.phone}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>
          <div className="customer-profile-field">
            <label>Address</label>
            <textarea
              name="address"
              value={profile.address}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="customer-profile-actions">
            {isEditing ? (
              <button onClick={handleSave} className="customer-profile-btn save">
                <FaSave /> Save Changes
              </button>
            ) : (
              <button onClick={toggleEdit} className="customer-profile-btn edit">
                <FaUserEdit /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
