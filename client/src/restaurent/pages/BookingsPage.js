import '../styles/BookingPage.css';

const BookingsPage = ({bookings, setBookings}) => {


  const handleAction = (action, id) => {
    console.log(`Action: ${action} on Booking ID: ${id}`)
    if (action === 'Cancel') {
      setBookings(prev =>
        prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)
      );
    }
  };

  const converDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const converTime = (time) => {
    const timeObj = new Date(time);
    const hours = timeObj.getHours();
    const minutes = timeObj.getMinutes();
    return `${hours}:${minutes}`;
  }

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
            {bookings.map((booking, index) => ( 
              <tr key={booking.id}>
                <td>{booking.user_name}</td>
                <td>{"T" + (index + 1)}</td>
                <td>{booking.number_of_people}</td>
                <td>{converDate(booking.booking_time)}</td>
                <td>{converTime(booking.booking_time)}</td>
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
