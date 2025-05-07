const express = require('express');
const {registerUser, loginUser, sendOtp, verifyOtp, sendResetOtp, resetPassword, verifyResetOtp, } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/send-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);



module.exports = router;