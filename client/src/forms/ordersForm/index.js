import React, { useState, useCallback, useEffect } from "react";
import "./index.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { baseUrl } from "../../config/constants";
import { createOrder } from "../../api/orderApi";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "200px",
};

const OrderForm = ({ onClose, orderDetails, userId }) => {
  const [specialRequest, setSpecialRequest] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation error:", error);
        }
      );
    } else {
      console.warn("Geolocation not supported.");
    }
  }, []);

  const onMapClick = useCallback((event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderDetails || !userId || !selectedLocation) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      restaurant_id: orderDetails.restaurantId,
      user_id: userId,
      food_item_id: orderDetails.id,
      special_request: specialRequest,
      location_lat: selectedLocation.lat,
      location_lng: selectedLocation.lng,
      total_amout: orderDetails.price
    };

    try {
      const response = await createOrder(orderData);
      alert("Order placed successfully!");
      console.log("Response:", response);
      onClose();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading Maps...</p>;

  return (
    <div className="order-popup-container">
      <h3 className="order-table-popup-title">Place Order</h3>
      <form onSubmit={handleSubmit} className="order-profile-info-container">
        <div className="order-profile-info">
          <div className="order-selected-item">
            <img className="order-selected-item-image" src={baseUrl + orderDetails?.image} alt={orderDetails?.name} />
            <p className="order-selected-item-name"><strong>{orderDetails?.name}</strong> - ₹{orderDetails?.price}</p>
          </div>
        </div>

        <div className="order-profile-info" style={{ marginBottom: "20px" }}>
          <label>Set Delevery Location (Click map to change)</label>
          <GoogleMap       
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={selectedLocation || { lat: 12.9716, lng: 77.5946 }}
            onClick={onMapClick}
          >
            {selectedLocation && (
              <Marker position={selectedLocation} />
            )}
          </GoogleMap>
        </div>

        <div className="order-profile-info">
          <label>Address</label>
          <textarea
            rows="3"
            placeholder="Any preferences or notes?"
            className="order-profile-description-textarea"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="order-upload-btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
