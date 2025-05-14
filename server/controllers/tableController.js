const Tables = require("../models/tableModel");

const getAllTables = async (req, res) => {
    try {
        const tables = await Tables.getAllTables();
        res.status(200).json(tables);
    } catch (error) {
        console.error("Error fetching tables:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getTablesByRestaurantId = async (req, res) => {    
    const { restaurantId } = req.params;
    
    try {
        const tables = await Tables.getTableByRestaurantId(restaurantId);
        if (!tables) {
            return res.status(404).json({ message: 'Tables not found' });
        }
        res.status(200).json(tables);
    } catch (error) {
        console.error("Error fetching tables:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getTableById = async (req, res) => {
    const { tableId } = req.params;
    try {
        const table = await Tables.getTableById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.status(200).json(table);
    } catch (error) {
        console.error("Error fetching table:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createTable = async (req, res) => {
    const { restaurant_id, table_number, seats } = req.body;
    try {
        const newTable = await Tables.createTable(restaurant_id, table_number, seats);
        res.status(201).json(newTable);
    } catch (error) {
        console.error("Error creating table:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateTable = async (req, res) => {
    const { tableId } = req.params;
    const { restaurantId, tableNumber, capacity } = req.body;
    try {
        const updatedTable = await Tables.updateTable(tableId, { restaurantId, tableNumber, capacity });
        res.status(200).json(updatedTable);
    } catch (error) {
        console.error("Error updating table:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getAllTables, getTableById, createTable, updateTable, getTablesByRestaurantId };