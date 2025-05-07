import axiosInstance from './axiosInstance'; // Your axiosInstance import


export const addMenuItem = async (formData) => {
  const response = await axiosInstance.post("/menu-items", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};


export const getMenuItems = async () => {
  try {
    const response = await axiosInstance.get("/menu-items");
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items", error);
    throw error;
  }
};

export const getMenuItemById = async (id) => {
  try {
    const response = await axiosInstance.get(`/menu-items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu item", error);
    throw error;
  }
};

export const updateMenuItem = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/menu-items/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating menu item", error);
    throw error;
  }
};

export const deleteMenuItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`/menu-items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item", error);
    throw error;
  }
};

export const getMenuItemsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/menu-items/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items by category", error);
    throw error;
  }
};

export const getMenuItemsByFoodType = async (foodType) => {
  try {
    const response = await axiosInstance.get(`/menu-items/food-type/${foodType}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items by food type", error);
    throw error;
  }
};

export const getMenuItemsByCategoryAndFoodType = async (category, foodType) => {
  try {
    const response = await axiosInstance.get(
      `/menu-items/category/${category}/food-type/${foodType}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items by category and food type", error);
    throw error;
  }
};

export const getMenuItemsBySearch = async (searchTerm) => {
  try {
    const response = await axiosInstance.get(`/menu-items/search/${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items by search", error);
    throw error;
  }
};

export const getMenuItemsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const response = await axiosInstance.get(
      `/menu-items/price-range/${minPrice}/${maxPrice}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items by price range", error);
    throw error;
  }
};

export const getMenuItemsByRating = async (minRating) => {
  try {
    const response = await axiosInstance.get(
      `/menu-items/rating/${minRating}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items by rating", error);
    throw error;
  }
};

export const getCategouries = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    throw error;
  }
};