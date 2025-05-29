import React, { useState } from "react";
import "./index.css";
import { addRestaurantImages } from "../../api/restaurentApi"; 

const RestaurantImagesForm = ({ restaurantData, onClose }) => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImages([...images, ...Array.from(e.dataTransfer.files)]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurantId = restaurantData.id;
    console.log("Restaurant ID:", restaurantId);
    

    const formData = new FormData();
    formData.append("restaurantId", restaurantId);
    images.forEach((img) => formData.append("images", img));

    try {
      const response = await addRestaurantImages(formData);
      alert("Images uploaded successfully!");
      console.log("Response:", response);
      onClose();
    } catch (error) {
      console.error("Error uploading images", error);
      alert("Failed to upload images.");
    }
  };

  return (
    <div className="order-popup-container">
      <h3 className="order-popup-title">Add Restaurant Images</h3>
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
          multiple
          style={{ display: "none" }}
        />
        <label className="order-upload-label" htmlFor="file-input">
          Drag & Drop or Click to{" "}
          <span className="upload-label">Upload Restaurant Images</span>
        </label>
      </div>

      <div className="order-profile-images-info-container">
        {images.map((image, index) => (
          <div key={index} className="order-image-preview">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="order-image-preview-img"
              onClick={() =>
                document.getElementById("file-input").click()
              }
            />
            <button
              className="order-remove-image"
              onClick={() => removeImage(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button className="order-upload-btn" onClick={handleSubmit}>
        Upload Images
      </button>
    </div>
  );
};

export default RestaurantImagesForm;
