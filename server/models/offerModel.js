const db = require("../config/db.js");

const Offers = {
  createOffer: (
    restaurantId,
    offerType,
    offerTitle,
    offerDescription,
    discountType,
    discountValue,
    itemIds,
    startDate,
    endDate,
    isActive
  ) => {
    return new Promise((resolve, reject) => {
      const offerQuery = `
        INSERT INTO offers 
          (restaurant_id, offer_type, offer_title, offer_description, discount_type, discount_value, start_date, end_date, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const offerData = [
        restaurantId,
        offerType,
        offerTitle,
        offerDescription,
        discountType,
        discountValue,
        startDate,
        endDate,
        isActive,
      ];

      db.query(offerQuery, offerData, (err, result) => {
        if (err) return reject(err);

        const offerId = result.insertId;

        if (itemIds && itemIds.length > 0) {
          const itemValues = itemIds.map((itemId) => [offerId, itemId]);
          const itemQuery = "INSERT INTO offer_items (offer_id, item_id) VALUES ?";

          db.query(itemQuery, [itemValues], (itemErr, itemResult) => {
            if (itemErr) return reject(itemErr);
            resolve(result);
          });
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = Offers;
