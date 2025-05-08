const { protect } = require("../middlewares/authMiddleware");
const express = require('express');
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } = require("../models/bookingModel");

const router = express.Router();

router.post('/table-booking', protect, (req, res) => {
    console.log(req.body);
    const { customerId, restaurantId, date, time, numberOfPeople } = req.body;
    
});

router.get('/booking', protect, getAllBookings);

router.get('/booking/:bookingId', protect, getBookingById);

router.put('/booking/:bookingId', protect, updateBooking);

router.delete('/booking/:bookingId', protect, deleteBooking);



module.exports = router;
