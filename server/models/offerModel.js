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
  getOffersByRestaurantId: (restaurantId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
  o.id AS offer_id,
  o.offer_type,
  o.offer_title,
  o.offer_description,
  o.discount_type,
  o.discount_value,
  o.start_date,
  o.end_date,
  o.is_active,
  GROUP_CONCAT(
    CONCAT(
      i.id, '||', 
      i.name, '||', 
      i.price, '||', 
      i.description, '||', 
      i.image
    ) SEPARATOR ';;'
  ) AS item_details
FROM offers o
LEFT JOIN offer_items oi ON o.id = oi.offer_id
LEFT JOIN menu_items i ON oi.item_id = i.id
WHERE o.restaurant_id = ?
GROUP BY o.id;
    `;

    db.query(query, [restaurantId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
},


};

module.exports = Offers;
