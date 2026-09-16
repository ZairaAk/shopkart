import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/customers",
  withCredentials: true,
});

export const registerCustomer = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginCustomer = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCurrentCustomer = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logoutCustomer = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;