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
    createBooking: (customerId, restaurantId, date, time, numberOfPeople) => {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO bookings (customer_id, restaurant_id, date, time, number_of_people)
                VALUES (?, ?, ?, ?, ?)
            `;
            db.query(sql, [customerId, restaurantId, date, time, numberOfPeople], (err, result) => {
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
