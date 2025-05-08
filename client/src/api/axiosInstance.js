import axios from "axios";
import { baseUrl } from "../config/constants";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use( 
  (config) => {
    const token = Cookies.get("jwtToken");

    const publicRoutes = ["/login", "/register", "/send-otp", "/verify-otp", "/restaurans/all", "/restaurant-profile/images"];

    if (token && !publicRoutes.includes(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;