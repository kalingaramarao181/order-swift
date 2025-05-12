const db = require("../config/db.js");

const Bookings = {
    getAllBookings: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM bookings", (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getBookingById: (id) => {   
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM bookings WHERE id = ?", [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    createBooking: (user_id, restaurant_id, table_id, booking_time, number_of_people, special_request) => {
        console.log("user_id", user_id, restaurant_id, table_id, booking_time, number_of_people, special_request);
        
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO bookings (user_id, restaurant_id, table_id, booking_time, number_of_people, special_request, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(sql, [user_id, restaurant_id, table_id, booking_time, number_of_people, special_request, "booked"], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    updateBooking: (id, bookingData) => {
        const { customerId, restaurantId, date, time, numberOfPeople } = bookingData;
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE bookings SET customer_id = ?, restaurant_id = ?, date = ?, time = ?, number_of_people = ? WHERE id = ?",
                [customerId, restaurantId, date, time, numberOfPeople, id],
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
    deleteBooking: (id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM bookings WHERE id = ?", [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getBookingsByCustomerId: (customerId) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM bookings WHERE customer_id = ?", [customerId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getBookingsByRestaurantId: (restaurantId) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM bookings WHERE restaurant_id = ?", [restaurantId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getBookingByDateAndTime: (restaurantId, date, time) => {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM bookings WHERE restaurant_id = ? AND date = ? AND time = ?",
                [restaurantId, date, time],
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
};
module.exports = Bookings;
