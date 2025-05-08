const db = require('../config/db.js');

const Menu = {
    createMenuItem: (restaurant_id, name, description, price, category, foodType, image) => {
        
        return new Promise((resolve, reject) => {
          const sql = `
            INSERT INTO menu_items (restaurant_id, name, description, price, category_id, food_type, image)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          db.query(sql, [restaurant_id, name, description, price, category, foodType, image], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      },
    getAllMenuItems: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM menu_items', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getMenuItemById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM menu_items WHERE restaurant_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    addMenuItem: (name, description, price, category, image) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO menu_items (id, name, description, price, category, image) VALUES (?, ?, ?, ?, ?, ?)',
                [uuidv4(), name, description, price, category, image],
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
    updateMenuItem: (id, itemData) => {
        const { name, description, price, category, foodType } = itemData;
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE menu_items SET name = ?, description = ?, price = ?, category_id = ?, food_type = ? WHERE id = ?',
                [name, description, price, category, foodType, id],
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
    deleteMenuItem: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM menu_items WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getMenuItemsByCategory: (category) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM menu_items WHERE category = ?', [category], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getMenuItemsByFoodType: (foodType) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM menu_items WHERE food_type = ?', [foodType], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getMenuItemsByCategoryAndFoodType: (category, foodType) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM menu_items WHERE category = ? AND food_type = ?',
                [category, foodType],
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
    getCategorys: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
};

module.exports = Menu;