const db = require("../config/db.js");

const Tables = {
    getAllTables: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM tables", (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getTableById: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM tables WHERE id = ?", [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    getTableByRestaurantId: (restaurantId) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM tables WHERE restaurant_id = ?", [restaurantId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    createTable: (restaurantId, tableNumber, seats) => {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO tables (restaurant_id, table_number, seats)
                VALUES (?, ?, ?)
            `;
            db.query(sql, [restaurantId, tableNumber, seats], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    updateTable: (id, tableData) => {
        const { restaurantId, tableNumber, capacity } = tableData;
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE tables SET restaurant_id = ?, table_number = ?, capacity = ? WHERE id = ?",
                [restaurantId, tableNumber, capacity, id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    updateTableAvailability: (id, isAvailable) => {
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE tables SET is_available = ? WHERE id = ?",
                [isAvailable, id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    deleteTable: (id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM tables WHERE id = ?", [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getTablesByRestaurantId: (restaurantId) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM tables WHERE restaurant_id = ?", [restaurantId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getTableByNumber: (restaurantId, tableNumber) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM tables WHERE restaurant_id = ? AND table_number = ?", [restaurantId, tableNumber], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

}
module.exports = Tables;
