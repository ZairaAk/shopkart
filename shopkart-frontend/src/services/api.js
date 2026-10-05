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

const productApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getAllProducts = async (params) => {
  try {
    const response = await productApi.get("/products", { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await productApi.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;

export const addToWishlist = async (productId) => {
  try {
    const response = await productApi.post(`/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const response = await productApi.delete(`/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getWishlist = async () => {
  try {
    const response = await productApi.get("/wishlist");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};