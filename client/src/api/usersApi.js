import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/all");
    return response.data;
  } catch (error) {
    console.error(
      "Get User Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get User Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
}



export const registerUser = async (registerDetails) => {
  try {
    const response = await axiosInstance.post("/register", registerDetails);
    return response.data;
  } catch (error) {
    console.error(
      "Register Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const updatePassword = async (passwordDetails) => {
  const response = await axiosInstance.post(
    "/reset-password",
    passwordDetails
  );
  return response.data;
};

export const sendOtp = (userData) => {
  const { email } = userData;
  if (!email) {
    throw new Error("Email is required to send OTP.");
  }
  return axiosInstance.post("/send-otp", { email });
};

export const sendResetOtp = (email) => {
  if (!email) {
    throw new Error("Email is required to send reset OTP.");
  }
  return axiosInstance.post("/send-reset-otp", { email });
}

export const verifyOtp = (email, otp, token) => {
  return axiosInstance.post("/verify-otp", { email, otp, token });
};

export const verifyResetOtp = (email, otp, token) => {
  return axiosInstance.post("/verify-reset-otp", { email, otp, token });
}

export const resetPassword = (resetToken, newPassword) => {
  return axiosInstance.post("/reset-password", { resetToken, newPassword });
};
