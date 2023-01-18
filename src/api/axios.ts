import axios from "axios";

export const API = axios.create({
  baseURL: "https://reqres.in/api",
});

export const getProductsPage = async (pageParam = 1) => {
  const response = await API.get(`/products?page=${pageParam}`);
  return response.data;
};