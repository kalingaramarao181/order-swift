import React, { useState } from "react";
import "./index.css";
import { getCookiesData } from "../../utils/cookiesData";
import { addRestaurantProfile } from "../../api/restaurentApi";

const RestaurantDetailsForm = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [descreiption, setDescription] = useState("");
  const [address, setAddress] = useState("");
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   if (!restaurantName || !address || !file) {
      alert("All fields are required!");
      return;
    }


    const ownerId = getCookiesData().userId;

    const formData = new FormData();
    formData.append("ownerId", ownerId);
    formData.append("name", restaurantName);
    formData.append("description", descreiption);
    formData.append("address", address);
    formData.append("image", file);

    try {
      const response = await addRestaurantProfile(formData);
      alert("Menu item added successfully!");
      console.log("Response:", response);
      onClose();
    } catch (error) {
      console.error("Error uploading menu item", error);
      alert("Failed to add menu item.");
    }
  };


  return (
    <div className="order-popup-container">
      <h3 className="order-popup-title">Add Restaurant Details</h3>
      <div
        className="order-file-drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.png,.jpeg"
          className="order-file-input"
          id="file-input"
          style={{ display: "none" }}
        />

        {file ? (
          <div
            className="order-image-preview"
            onClick={() => document.getElementById("file-input").click()}
          >
            <img
              src={URL.createObjectURL(file)}
              alt="Restaurant Logo"
              className="order-image-preview-img"
            />
          </div>
        ) : (
          <label className="order-upload-label" htmlFor="file-input">
            Drag & Drop or Click to{" "}
            <span className="upload-label">Upload Restaurant Logo Image</span>
          </label>
        )}
      </div>

      <div className="order-profile-info-container">
        <div className="order-profile-info">
          <label>Restaurant Name</label>
          <input
            className="order-profile-info-input"
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </div>
        <div className="order-profile-info">
        <label>Description</label>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter about your restaurant here..."
        className="order-profile-description-textarea"
        value={descreiption}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
        </div>
        <div className="order-profile-info">
        <label>Address</label>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your restaurant address here..."
        className="order-profile-description-textarea"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>
        </div>
      </div>

      <button className="order-upload-btn" onClick={handleSubmit}>
        Update Restaurant Details
      </button>
    </div>
  );
};

export default RestaurantDetailsForm;
