const Bookings = require("../models/bookingModel");

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Bookings.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getBookingById = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Bookings.getBookingById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createBooking = async (req, res) => {
    const { userId, restaurantId, date, time, numberOfGuests } = req.body;
    console.log("Booking data:", req.body);
    
    try {
        const newBooking = await Bookings.createBooking(userId, restaurantId, date, time, numberOfGuests);
        res.status(201).json(newBooking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { userId, restaurantId, date, time, numberOfGuests } = req.body;
    try {
        const updatedBooking = await Bookings.updateBooking(bookingId, { userId, restaurantId, date, time, numberOfGuests });
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        await Bookings.deleteBooking(bookingId);
        res.status(204).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getBookingByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const bookings = await Bookings.getBookingByUserId(userId);
        if (!bookings) {
            return res.status(404).json({ message: 'Bookings not found' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
    getBookingByUserId
}