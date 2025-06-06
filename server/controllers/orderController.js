const Orders = require("../models/ordersModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Orders.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrdersByRestaurantId = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const orders = await Orders.getOrdersByRestaurantId(restaurantId);
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by restaurant ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrdersByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  try {
    const orders = await Orders.getOrdersByCustomerId(customerId);
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by customer ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createOrder = async (req, res) => {
  const { user_id, restaurant_id, food_item_id, total_amout, special_request, location_lat, location_lng } = req.body;

  const location = JSON.stringify({
    lat: location_lat,
    lng: location_lng,
  });

  try {
    const newOrder = await Orders.createOrder(user_id, restaurant_id, food_item_id, total_amout, location, special_request);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { user_id, restaurant_id, food_item_id, quantity, special_request, location } = req.body;
  
  try {
    const updatedOrder = await Orders.updateOrder(orderId, {
      user_id,
      restaurant_id,
      food_item_id,
      quantity,
      special_request,
      location,
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, estimatedTime } = req.body;
  const currentTime = new Date();
  const updatedEstimatedTime = new Date(currentTime.getTime() + estimatedTime * 60000);

  try {
    const updatedOrder = await Orders.updateOrderStatus(orderId, status, updatedEstimatedTime);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderDetailsByOrderId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderDetails = await Orders.getOrderDetailsByOrderId(orderId);
    if (!orderDetails) {
      return res.status(404).json({ message: "Order details not found" });
    }
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error fetching order details by order ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    await Orders.deleteOrder(orderId);
    res.status(204).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderStatusByOrderId = () => {
  return async (req, res) => {
    const { orderId } = req.params;
    try {
      const orderStatus = await Orders.getOrderStatusByOrderId(orderId);
      if (!orderStatus) {
        return res.status(404).json({ message: "Order status not found" });
      }
      res.status(200).json(orderStatus);
    } catch (error) {
      console.error("Error fetching order status by order ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

}

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Orders.getOrdersByUserId(userId);
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  getOrderDetailsByOrderId,
  deleteOrder,
  getOrdersByUserId,
  getOrderStatusByOrderId ,
  getOrdersByRestaurantId,
  getOrdersByCustomerId
};
