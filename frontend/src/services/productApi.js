import axios from "axios";

const API = "http://localhost:3000/api/products";

export const getProducts = async (category = "all", sort = "") => {
  const params = new URLSearchParams();

  if (category !== "all") params.append("category", category);
  if (sort) params.append("sort", sort);

  const response = await axios.get(`${API}?${params.toString()}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const res = await axios.get(`${API}/search?q=${query}`);
  return res.data;
};