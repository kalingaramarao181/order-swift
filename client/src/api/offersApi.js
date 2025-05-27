import axiosInstance from './axiosInstance'; 


export const createOffer = async (offerData) => {
    try {
        const response = await axiosInstance.post("/offers/add", offerData);
        return response.data;
    } catch (error) {
        console.error("Error creating offer", error);
        throw error;
    }
};