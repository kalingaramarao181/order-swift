const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserRole, getUsersByRole } = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getUserById, getAllUsers, getUserDetails } = require('../controllers/userController');

const router = express.Router();

// router.post('/register', registerUser);
// router.post('/update-role', protect, authorize(['super_admin', 'enterprise_admin']), updateUserRole);
// router.post('/login', loginUser);
// router.get('/profile', protect, getUserProfile);
// router.get('/user-details/:userId', protect, getUserDetails);
// router.get('/users-by-role/:roleId', protect, getUsersByRole);
router.get('/user/:userId', getUserById);
router.get('/users/all', getAllUsers);
router.get('/user-details/:userId', protect, getUserDetails);



module.exports = router;