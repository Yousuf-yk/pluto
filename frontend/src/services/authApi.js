import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

// REGISTER
export const register = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// LOGIN
export const login = async (userData) => {
  try {
    const response = await API.post("/login", userData);

    // Save JWT token
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};

// GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

// CHECK LOGIN
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export default API;