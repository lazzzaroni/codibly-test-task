import { ProductsPage } from "../interfaces";

export const getProductsPage = async (
  pageParam = 1,
  perPage: number,
  search = ""
): Promise<ProductsPage> => {
  const url = new URL("https://reqres.in/api/products");
  url.searchParams.append("page", pageParam.toString());
  url.searchParams.append("per_page", perPage.toString());

  search && url.searchParams.append("id", search);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return data;
};

// https://reqres.in/api/products?page=1&per_page=5
