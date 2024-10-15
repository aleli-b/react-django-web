import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl =
  "https://154eb847-87b0-4b5b-a768-b5efd08aa722-dev.e1-us-east-azure.choreoapis.dev/djangoreact/backend/v1";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
