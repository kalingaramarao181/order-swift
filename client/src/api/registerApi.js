import authInstance from "./axiosInstance";

export const sendOtp = async (data) => {
    const response = await authInstance.post("/auth/send-otp", data);
    return response.data;
  };
  
  export const verifyOtp = async (data) => {
    const response = await authInstance.post("/auth/verify-otp", data);
    return response.data;
  };
  
  export const registerUser = async (data) => {
    const response = await authInstance.post("/auth/register", data);
    return response.data;
  };
