export interface ProductsPage {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data[] | Data;
  support: {
    url: string;
    text: string;
  };
}

export interface Data {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface PageButtonProps {
  pageNum: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
