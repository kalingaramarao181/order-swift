import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

export const loginUser = async (loginDetails, setMessage) => {
  try {
    const response = await axiosInstance.post("/login", loginDetails);

    const token = response?.data?.token;
    const userData = response?.data?.user;

    if (!token || !userData) {
      throw new Error("Invalid login response");
    }
    Cookies.set("jwtToken", token, { expires: 30 });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      setMessage("Invalid email or password. Please try again.");
    } else if (error.response?.status === 404) {
      setMessage("User not found. Please check your email.");
    } else if (error.response?.status === 500) {
      setMessage("Server error. Please try again later.");
    } else {
      setMessage("An unexpected error occurred. Please try again.");
    }
    throw error.response?.data || error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user-details/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get User Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const getUsersByRole = async (roleId) => {
  try {
    const response = await axiosInstance.get("/users-by-role/" + roleId);
    console.log(response.data);

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
