const Offers = require("../models/offerModel");

const createOffer = async (req, res) => {
  const {
    restaurantId,
    offerType,
    offerTitle,
    offerDescription,
    discountType,
    discountValue,
    itemIds = [],
    startDate,
    endDate,
    isActive = true,
  } = req.body;

  try {
    const newOffer = await Offers.createOffer(
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
    );
    res.status(201).json({ message: "Offer created successfully", offerId: newOffer.insertId });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { createOffer };