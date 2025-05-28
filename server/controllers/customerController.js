const Menu = require('../models/menuItemModel');
const Orders = require('../models/ordersModel');
const Customer = require('../models/customerModel');


const getCustumerDetails = async (req, res) => {
    const { customerId } = req.params;

  try {
    const orders = await Orders.getOrdersByCustomerId(customerId);
    const profile = await Customer.getCustomerDetailsByCustomerId(customerId);
    
    res.status(200).json({
        userName: profile[0].name,
        email: profile[0].email,
        orders: orders.map((order) => ({
            order_id: order.order_id,
            date: order.date,
            time: order.time,
            status: order.status,
        }))
    });
  } catch (error) {
    console.error("Error in getRestaurantDetails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { getCustumerDetails, };