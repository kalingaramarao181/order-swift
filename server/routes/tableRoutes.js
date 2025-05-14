const { protect } = require("../middlewares/authMiddleware");
const express = require('express');

const router = express.Router();

const { createTable, getAllTables, getTableById, updateTable, getTablesByRestaurantId } = require("../controllers/tableController");

router.post('/table', protect, createTable);

router.get('/tables', protect, getAllTables);

router.get('/restaurant/tables/:restaurantId', getTablesByRestaurantId);

router.get('/table/:tableId', protect, getTableById);

router.put('/table/:tableId', protect, updateTable);


module.exports = router;