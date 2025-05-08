import React, { useState, useEffect } from "react";
import { addMenuItem, updateMenuItem } from "../../api/menuItemApi";
import { getCategouries } from "../../api/menuItemApi";
import "./index.css";
import { getCookiesData } from "../../utils/cookiesData";

const AddMenuItemForm = ({ onClose, editData }) => {
  const [file, setFile] = useState(null);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategouries();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editData) {
      setItemName(editData.name);
      setPrice(editData.price);
      setCategory(editData.category_id);
      setFoodType(editData.food_type);
      setDescription(editData.description);
    }
  }, [editData]);

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
    console.log(itemName, price, category, foodType, description, file);
    
  
    if (!itemName || !price || !category || !foodType) {
      alert("All fields are required!");
      return;
    }
  
    const restaurantId = getCookiesData().userId;
  
    const formData = new FormData();
    formData.append("restaurantId", restaurantId);
    formData.append("name", itemName);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("foodType", foodType);
    formData.append("description", description);
    if (file) formData.append("image", file);
  
    try {
      if (editData) {
        await updateMenuItem(editData.id, formData);
        alert("Menu item updated successfully!");
      } else {
        await addMenuItem(formData);
        alert("Menu item added successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error submitting menu item", error);
      alert("Failed to submit menu item.");
    }
  };


  return (
    <div className="order-popup-container">
      <h3 className="order-popup-title">Add Menu Item</h3>
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
              alt="Menu Item"
              className="order-image-preview-img"
            />
          </div>
        ) : (
          <label className="order-upload-label" htmlFor="file-input">
            Drag & Drop or Click to{" "}
            <span className="upload-label">Upload Item Image</span>
          </label>
        )}
      </div>

      <div className="order-info-container">
        <div className="order-info">
          <label>Item Name</label>
          <input
            className="order-info-input"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <label>Price (in rupees)</label>
          <input
            className="order-info-input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="order-info">
          <label>Category</label>
          <select
            className="order-info-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label>Food type</label>
          <select
            className="order-info-select"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          >
            <option value="">Select Food Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
      </div>

      <textarea
        rows="4"
        cols="50"
        placeholder="Brief Description about the dish..."
        className="order-description-textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button className="order-upload-btn" onClick={handleSubmit}>
        Upload Item
      </button>
    </div>
  );
};

export default AddMenuItemForm;
