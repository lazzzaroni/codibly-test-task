import axios from "axios";
import { Data, ProductsPage } from "../interfaces";

export const API = axios.create({
  baseURL: "https://reqres.in/api",
});

export const getProductsPage = async (pageParam = 1): Promise<ProductsPage> => {
  const response = await API.get(`/products?page=${pageParam}`);
  return response.data;
};
