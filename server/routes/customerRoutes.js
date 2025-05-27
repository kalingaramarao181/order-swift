const express = require('express');
const { protect } = require("../middlewares/authMiddleware");
const { getCustumerDetails } = require("../controllers/customerController");

const router = express.Router();

router.post('/customer/details/:customerId', (req, res) => {
    console.log(req.params.customerId);
    
});

module.exports = router;
