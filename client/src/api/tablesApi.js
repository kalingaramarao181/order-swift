import axiosInstance from './axiosInstance'; 


export const getTables = async (restaurantId) => {
    try {
        const response = await axiosInstance.get("/tables/" + restaurantId);
        return response.data;
    } catch (error) {
        console.error("Error fetching tables", error);
        throw error;
    }
};

export const getTableById = async (id) => {
    try {
        const response = await axiosInstance.get("/tables/" + id);
        return response.data;
    } catch (error) {
        console.error("Error fetching table", error);
        throw error;
    }
};

export const getTablesByRestaurantId = async (restaurantId) => {
    try {
        const response = await axiosInstance.get("/restaurant/tables/" + restaurantId);
        return response.data;
    } catch (error) {
        console.error("Error fetching tables by restaurant ID", error);
        throw error;
    }
};


export const createTable = async (tableData) => {
    try {
        const response = await axiosInstance.post("/table", tableData);
        return response.data;
    } catch (error) {
        console.error("Error creating table", error);
        throw error;
    }
};