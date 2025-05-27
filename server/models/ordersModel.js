const db = require("../config/db.js");

const Orders = {
    getAllOrders: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM orders", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    getOrderById: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM orders WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result[0]); // Return single order
            });
        });
    },

    createOrder: (user_id, restaurant_id, food_item_id, total_amout,  location, special_request) => {
        
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO orders (user_id, restaurant_id, food_item_id, total_amout, special_request, location, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(sql, [user_id, restaurant_id, food_item_id, total_amout, special_request, location, "pending"], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    updateOrder: (id, orderData) => {
        const { user_id, restaurant_id, food_item_id, total_amout, total_price, order_time, special_request, status } = orderData;
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE orders 
                SET user_id = ?, restaurant_id = ?, food_item_id = ?, total_amout = ?, total_price = ?, order_time = ?, special_request = ?, status = ?
                WHERE id = ?
            `;
            db.query(sql, [user_id, restaurant_id, food_item_id, total_amout, total_price, order_time, special_request, status, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    deleteOrder: (id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM orders WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    getOrdersByUserId: (user_id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM orders WHERE user_id = ?", [user_id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    getOrdersByCustomerId: (customer_id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM orders WHERE user_id = ?", [customer_id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    getOrdersByRestaurantId: (restaurant_id) => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                    orders.*, 
                    users.name AS user_name, 
                    restaurants.name AS restaurant_name, 
                    menu_items.name AS food_name 
                FROM orders
                JOIN users ON orders.user_id = users.id
                JOIN restaurants ON orders.restaurant_id = restaurants.id
                JOIN menu_items ON orders.food_item_id = menu_items.id
                WHERE orders.restaurant_id = ?
            `, [restaurant_id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    getOrderByDateAndTime: (restaurant_id, date, time) => {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM orders WHERE restaurant_id = ? AND DATE(order_time) = ? AND TIME(order_time) = ?",
                [restaurant_id, date, time],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },
};

module.exports = Orders;
