import axiosInstance from './axiosInstance'; 

export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order", error);
    throw error;
  }
};

export const getOrdersByRestaurantId = async (restaurantId) => {
  try {
    const response = await axiosInstance.get(`/orders/restaurant/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders by restaurant ID", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, orderData) => {
  try {
    const response = await axiosInstance.put(`/orders/status/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error updating order status", error);
    throw error;
  }
}

export const getOrderDetailsByOrderId = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/orders/order-details/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details by order ID", error);
    throw error;
  }
}

export const fetchOrderStatus = async (orderId) => {
  const response = await fetch(`/orders/status/${orderId}`);
  if (!response.ok) throw new Error("Failed to fetch order");
  return await response.json();
};
