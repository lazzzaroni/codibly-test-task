import axios, { isAxiosError } from "axios";
import { ProductsPage } from "../interfaces";

export const API = axios.create({
  baseURL: "https://reqres.in/api",
});

export const getProductsPage = async (
  pageParam = 1,
  perPage: number,
  search = ""
) => {
  try {
    const { data } = await API.get<ProductsPage>("/products", {
      params: {
        page: pageParam.toString(),
        per_page: perPage.toString(),
        ...(search ? { id: search } : {}),
      },
    });

    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      const status = e.response?.status as number;
      if (status >= 400 && status < 500) {
        throw new Error(`Error ${status}: Something went wrong on client side`);
      } else if (status > 500) {
        throw new Error(`Error ${status}: Something went wrong on server side`);
      }
    }
  }
};

// (optional) get data with Fetch API
export const getProductsPageWithFetch = async (
  pageParam = 1,
  perPage: number,
  search = ""
): Promise<ProductsPage> => {
  const url = new URL("https://reqres.in/api/products");
  url.searchParams.append("page", pageParam.toString());
  url.searchParams.append("per_page", perPage.toString());
  search && url.searchParams.append("id", search);

  const response = await fetch(url);

  const status = response.status;
  if (status >= 400 && status < 500) {
    throw new Error(`Error ${status}: Something went wrong on client side`);
  } else if (status > 500) {
    throw new Error(`Error ${status}: Something went wrong on server side`);
  }

  const data = await response.json();

  return data;
};

// https://reqres.in/api/products?page=1&per_page=5
