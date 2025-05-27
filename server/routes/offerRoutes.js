const { protect } = require("../middlewares/authMiddleware");
const express = require('express');

const router = express.Router();

const { createOffer, getAllOffers, getOfferById, updateOffer,  } = require("../controllers/offerController");

router.post('/offers/add', protect, createOffer);


module.exports = router;