const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    createUser: async (name, email,  phone, password, location, role) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users (name, email, phone, password, location, created_at, role_id) VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
                [name, email,  phone, hashedPassword, location, role],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM USERS WHERE email = ?`, 
                [email], 
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else if (result.length === 0) {
                        resolve(null);
                    } else {
                        resolve(result[0]);
                    }
                }
            );
        });
    },

    findEmailById: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT email FROM users WHERE id = ?`, 
                [userId], 
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else if (result.length === 0) {
                        resolve(null);
                    } else {
                        resolve(result[0].email);
                    }
                }
            );
        });
    },


    findUserByRole: (roleId) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM users WHERE role_id = ?`, 
                [roleId], 
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else if (result.length === 0) {
                        resolve(null);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    findById: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT users.*, roles.name as role FROM users 
                 JOIN roles ON users.role_id = roles.id 
                 WHERE users.id = ?`, 
                [userId], 
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else if (result.length === 0) {
                        resolve(null);
                    } else {
                        resolve(result[0]);
                    }
                }
            );
        });
    },
    
    updateUserPassword: (email, newPassword) => {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE users SET password = ? WHERE email = ?`,
                [hashedPassword, email],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    },

    updateUserRole: (userId, newRole) => {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE users SET role_id = (SELECT id FROM roles WHERE name = ?) WHERE id = ?`,
                [newRole, userId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    },
    findAllUsers: () => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT users.*, roles.name as role FROM users 
                 JOIN roles ON users.role_id = roles.id`, 
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else if (result.length === 0) {
                        resolve(null);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

};

module.exports = User;
