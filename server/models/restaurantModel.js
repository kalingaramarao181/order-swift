const db = require("../config/db.js");

const Restaurant = {
  createRestaurant: (ownerId, name, description, location, image) => {
    return new Promise((resolve, reject) => {
      const sql = `
                INSERT INTO restaurants (owner_id, name, description, location, image_url)
                VALUES (?, ?, ?, ?, ?)
            `;
      db.query(
        sql,
        [ownerId, name, description, location, image],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  getRestaurantProfile: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM restaurants", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  uploadMultipleRestaurantImages: (imageEntries) => {
    return new Promise((resolve, reject) => {
      const sql = `
                INSERT INTO restaurant_images (restaurant_id, image_url, description, created_at)
                VALUES ?
            `;
      const values = imageEntries.map((entry) => [
        entry.restaurant_id,
        entry.image_url,
        entry.description,
        entry.created_at,
      ]);
      db.query(sql, [values], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  getRestaurantProfileById: (owner_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM restaurants WHERE owner_id = ?",
        [owner_id],
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

  getRestaurantProfileByRestaurantId: (restaurantId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM restaurants WHERE id = ?",
        [restaurantId],
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

  getAllRestaurants: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
         r.id AS restaurant_id, r.name, r.description, r.location, r.image_url AS logo,
         ri.image_url AS restaurant_image
       FROM restaurants r
       LEFT JOIN restaurant_images ri ON r.id = ri.restaurant_id`,
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

  getRestaurantImagesById: (restaurantId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM restaurant_images WHERE restaurant_id = ?",
        [restaurantId],
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
  updateRestaurantProfile: (image) => {
    return new Promise((resolve, reject) => {
      const sql = `
                UPDATE restaurant
                SET image = ?
                WHERE id = ?
            `;
      db.query(sql, [image], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  deleteRestaurantProfile: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM restaurant WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = Restaurant;
