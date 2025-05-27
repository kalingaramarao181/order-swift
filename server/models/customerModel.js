const db = require("../config/db.js");

const Customer = {
    getCustomerDetailsByCustomerId: (customerId) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE id = ?", [customerId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
}

module.exports = Customer