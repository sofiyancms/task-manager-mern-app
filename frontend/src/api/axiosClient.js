import axios from "axios";
import { clearAuth, getAuth } from "../utils/storage";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const axiosClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  (config) => {
    const auth = getAuth();
    const token = auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      clearAuth();
      window.location.assign("/login");
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
