import React, { useState } from "react";
import "./index.css";
import { baseUrl } from "../../config/constants";
import { createOffer } from "../../api/offersApi";

const AddOfferForm = ({ onClose, menuItems, restaurantId }) => {
  const [offerName, setOfferName] = useState("");
  const [description, setDescription] = useState("");
  const [offerType, setOfferType] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const callaculateTotalPrice = () => {
    let total = 0;
    selectedItems.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const finelPrice = callaculateTotalPrice() - discount;

  const handleOfferTypeChange = (type) => {
    setOfferType(type);
    setSelectedItems([]);
  };

  const handleOfferItems = (value) => {
    const item = menuItems.find((item) => item.id === parseInt(value));

    if (!item) return;

    if (offerType === "COMBO") {
      const alreadySelected = selectedItems.find((i) => i.id === item.id);
      if (!alreadySelected) {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setSelectedItems([item]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const offerData = {
      restaurantId: restaurantId,
      offerType,
      offerTitle: offerName,
      offerDescription: description,
      discountType: "FLAT",
      discountValue: parseFloat(discount),
      itemIds: selectedItems.map((item) => item.id),
      startDate,
      endDate,
      isActive: true,
    };

    try {
      const response = await createOffer(offerData);

      if (response.ok) {
        alert("Offer added successfully");
        onClose();
      } else {
        alert(response.message || "Failed to add offer");
      }
    } catch (err) {
      console.error("Error adding offer:", err);
      alert("Error submitting offer");
    }
  };

  return (
    <div className="order-popup-container">
      <h3 className="order-popup-title">Add Offer</h3>
      <input
        className="order-info-input"
        placeholder="Enter Offer Name"
        type="text"
        value={offerName}
        onChange={(e) => setOfferName(e.target.value)}
      />
      <select
        className="order-info-input"
        onChange={(e) => handleOfferTypeChange(e.target.value)}
        value={offerType}
        required
      >
        <option value="">Select Offer Type</option>
        <option value="COMBO">Combo</option>
        <option value="ITEM">Item</option>
        <option value="RESTAURANT">Restaurant</option>
      </select>

      {offerType !== "RESTAURANT" && (
        <select
          className="order-info-input"
          onChange={(e) => handleOfferItems(e.target.value)}
        >
          <option value="">Select Items</option>
          {menuItems.map((item) => (
            <option key={item._id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}

      <input
        className="order-info-input"
        type="number"
        placeholder="Enter Discount"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />

      <input
        className="order-info-input"
        type="number"
        placeholder="Final Price after Discount"
        value={finelPrice}
        readOnly
      />

      <div className="order-date-container">
        <div>
          <label>Start Date</label>
          <input className="order-info-input" type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div>
          <label>End Date</label>
          <input className="order-info-input" type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        </div>
      </div>

      <textarea
        rows="4"
        cols="50"
        placeholder="Brief Description about the offer..."
        className="order-description-textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <div className="selected-items-container">
        {selectedItems.map((item) => (
          <div key={item.id} className="selected-item">
            <img
              className="selected-item-image"
              src={`${baseUrl}${item.image}`}
              alt={item.name}
            />
            <p className="selected-item-name">{item.name}</p>
          </div>
        ))}
      </div>

      <button className="order-upload-btn" onClick={handleSubmit}>
        Upload Offer
      </button>
    </div>
  );
};

export default AddOfferForm;
