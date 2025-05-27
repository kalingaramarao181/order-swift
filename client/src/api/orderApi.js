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
