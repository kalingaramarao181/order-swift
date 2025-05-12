const { protect } = require("../middlewares/authMiddleware");
const express = require('express');
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } = require("../controllers/bookingController");

const router = express.Router();

router.post('/table-booking', protect, createBooking);

router.get('/booking', protect, getAllBookings);

router.get('/booking/:bookingId', protect, getBookingById);

router.put('/booking/:bookingId', protect, updateBooking);

router.delete('/booking/:bookingId', protect, deleteBooking);



module.exports = router;
