import axios from "axios";

// 1. Create the Instance
const API = axios.create({
  baseURL: "https://taskmaster-gkuk.onrender.com/api",
});

// 2. Add the Interceptor (Automatically adds the Token)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 3. Export specific functions for your components to use
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

export default API;