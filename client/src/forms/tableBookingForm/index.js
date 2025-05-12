import React, { useState } from "react";
import "./index.css";
import { createTabelBooking } from "../../api/tableBookingApi";

const TableBookingForm = ({ onClose, restaurantData, userId }) => {
  
    
  const [tableId, setTableId] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tableId || !bookingTime || !numberOfPeople || !userId) {
      alert("Please fill in all required fields.");
      return;
    }

    const selectedTable = restaurantData?.tables?.find(
        (table) => String(table.id) === String(tableId)
      );
      
      if (parseInt(numberOfPeople) > selectedTable?.seats) {
        alert("Selected table does not have enough seats for the number of people.");
        return;
      }

    const bookingData = {
      restaurant_id: restaurantData?.restaurantId,
      table_id: parseInt(tableId),
      user_id: userId,
      booking_time: bookingTime,
      number_of_people: parseInt(numberOfPeople),
      special_request: specialRequest,
    };

    

    try {
      const response = await createTabelBooking(bookingData);
      alert("Table booked successfully!");
      console.log("Response:", response);
      onClose();
    } catch (error) {
      console.error("Error booking table:", error);
      alert("Failed to book table.");
    }
  };

  return (
    <div className="order-popup-container">
      <h3 className="order-table-popup-title">Book Table</h3>
      <form onSubmit={handleSubmit} className="order-profile-info-container">
        <div className="order-profile-info">
          <label>Choose Table</label>
          <select
            className="order-profile-info-input"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            required
          >
            <option value="">-- Select Table --</option>
            {restaurantData?.tables?.map((table) => (
              <option key={table.id} value={table.tableId}>
                T{table.tableNumber} ({table.seats} seats) <span>{table.isAvailable ? "Available" : "Booked"}</span>
              </option>
            ))}
          </select>
        </div>

        <div className="order-profile-info">
          <label>Booking Time</label>
          <input
            className="order-profile-info-input"
            type="datetime-local"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
          />
        </div>

        <div className="order-profile-info">
          <label>Number of People</label>
          <input
            className="order-profile-info-input"
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            required
          />
        </div>

        <div className="order-profile-info">
          <label>Special Request</label>
          <textarea
            rows="3"
            placeholder="Any special request?"
            className="order-profile-description-textarea"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="order-upload-btn">
          Book Table
        </button>
      </form>
    </div>
  );
};

export default TableBookingForm;
