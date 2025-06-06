const express = require('express');
const { protect } = require("../middlewares/authMiddleware");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderDetailsByOrderId,
  getOrdersByRestaurantId,
  getOrderStatusByOrderId,
  getOrdersByCustomerId,    
} = require("../controllers/orderController");

const router = express.Router();

router.post('/orders', protect, createOrder);

router.get('/orders/all', protect, getAllOrders);

router.get('/orders/customer/:customerId', protect, getOrdersByCustomerId);

router.get('/orders/restaurant/:restaurantId', protect, getOrdersByRestaurantId);

router.get('/orders/:orderId', protect, getOrderById);

router.get('/orders/order-details/:orderId', protect, getOrderDetailsByOrderId);

router.get('/orders/status/:orderId', protect, getOrderStatusByOrderId);




router.put('/orders/:orderId', protect, updateOrder);

router.put('/orders/status/:orderId', protect, updateOrderStatus);


router.delete('/orders/:orderId', protect, deleteOrder);

module.exports = router;
