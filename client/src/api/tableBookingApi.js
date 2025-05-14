import axiosInstance from './axiosInstance'; 

export const getTableBookings = async () => {
  try {
    const response = await axiosInstance.get("/table-bookings/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching table bookings", error);
    throw error;
  }
}

export const getTableBookingById = async (id) => {
  try {
    const response = await axiosInstance.get(`/table-bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching table booking", error);
    throw error;
  }
}

export const getBookingsByRestaurantId = async (restaurentId) => {
  try {
    const response = await axiosInstance.get("/table-booking/restaurant/" + restaurentId);
    return response.data;
  } catch (error) {
    console.error("Error fetching table bookings by restaurant ID", error);
    throw error;
  }
}

export const createTabelBooking = async (bookingData) => {
  try {
    const response = await axiosInstance.post("/table-booking", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating table booking", error);
    throw error;
  }
}