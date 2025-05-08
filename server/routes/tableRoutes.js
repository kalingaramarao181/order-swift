const { protect } = require("../middlewares/authMiddleware");
const express = require('express');

const router = express.Router();

const { createTable, getAllTables, getTableById, updateTable, deleteTable, getTableByRestaurantId } = require("../models/tableModel");

router.post('/table', protect, createTable);

router.get('/tables', protect, getAllTables);

router.get('/restaurant/tables/:restaurantId', protect, getTableByRestaurantId);

router.get('/table/:tableId', protect, getTableById);

router.put('/table/:tableId', protect, updateTable);

router.delete('/table/:tableId', protect, deleteTable);

module.exports = router;