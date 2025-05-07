import React, { useState } from 'react';
import '../styles/BookingPage.css';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([
    { id: 1, name: 'John Doe', table: 'T1', seats: 4, date: '2025-05-03', time: '7:00 PM', status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', table: 'T2', seats: 2, date: '2025-05-03', time: '8:00 PM', status: 'Pending' },
    { id: 3, name: 'Bob Stone', table: 'T3', seats: 3, date: '2025-05-04', time: '6:30 PM', status: 'Cancelled' }
  ]);

  const handleAction = (action, id) => {
    console.log(`Action: ${action} on Booking ID: ${id}`);
    if (action === 'Cancel') {
      setBookings(prev =>
        prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)
      );
    }
  };

  return (
    <div className="os-bookings-container">
      <section className="os-welcome-section">
        <h2 className="os-welcome-title">Manage Bookings</h2>
        <p className="os-restaurant-name">Spicy Bite Restaurant</p>

        <div className="os-stats-wrapper">
          <div className="os-stat-card">📅 Total Bookings<br /><strong>{bookings.length}</strong></div>
          <div className="os-stat-card">✅ Confirmed<br /><strong>{bookings.filter(b => b.status === 'Confirmed').length}</strong></div>
          <div className="os-stat-card">⏳ Pending<br /><strong>{bookings.filter(b => b.status === 'Pending').length}</strong></div>
        </div>
      </section>

      <section className="os-sections-grid">
        <div className="os-section-card">📆 Book a Table</div>
        <div className="os-section-card">🪑 Book a Seat</div>
        <div className="os-section-card">🔍 View Status</div>
        <div className="os-section-card">✏️ Edit Bookings</div>
        <div className="os-section-card">❌ Cancel Bookings</div>
        <div className="os-section-card">📊 Booking Analytics</div>
      </section>

      <section className="os-bookings-table">
        <h3 style={{ marginBottom: '10px' }}>All Bookings</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Table</th>
              <th>Seats</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{booking.table}</td>
                <td>{booking.seats}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.status}</td>
                <td>
                  <button className="os-action-btn" onClick={() => handleAction('View', booking.id)}>View</button>
                  {booking.status !== 'Cancelled' && (
                    <button className="os-action-btn" onClick={() => handleAction('Cancel', booking.id)}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default BookingsPage;
