import axiosInstance from './axiosInstance'; 


export const addRestaurantProfile = async (formData) => {
  const response = await axiosInstance.post("/restaurant-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getRestaurantProfile = async () => {
  try {
    const response = await axiosInstance.get("/restaurant-profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant profile", error);
    throw error;
  }
};

export const getRestaurantProfileById = async (id) => {
  try {
    const response = await axiosInstance.get(`/restaurant-profile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant profile", error);
    throw error;
  }
};

export const getRestaurantImagesById = async (id) => {
  try {
    const response = await axiosInstance.get(`/restaurant-profile/images/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant images", error);
    throw error;
  }
};


export const addRestaurantImages = async (formData) => {
  try {
    const response = await axiosInstance.post(`/restaurant-profile/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding restaurant images", error);
    throw error;
  }
}

export const updateRestaurantProfile = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/restaurant-profile/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating restaurant profile", error);
    throw error;
  }
};

export const deleteRestaurantProfile = async (id) => {
  try {
    const response = await axiosInstance.delete(`/restaurant-profile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting restaurant profile", error);
    throw error;
  }
};

export const getRestaurantProfileByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/restaurant-profile/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant profiles by category", error);
    throw error;
  }
};


