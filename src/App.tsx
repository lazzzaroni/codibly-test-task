import { useState } from "react";
import { useQuery } from "react-query";

import { getProductsPage } from "./api/axios";
import { ColorOfTheYear, PageButton, Pagination } from "./components";
import { Data } from "./interfaces";

import "./App.css";

function App() {
  const [page, setPage] = useState<number>(1);

  const {
    isLoading,
    isError,
    error,
    data: colors,
    isFetching,
    isPreviousData,
  } = useQuery(["/products", page], () => getProductsPage(page), {
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading Colors...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  const content = colors?.data.map((color: Data) => (
    <ColorOfTheYear key={color.id} color={color} />
  ));

  const lastPage = () => setPage(colors?.total_pages as number);

  const firstPage = () => setPage(1);

  const pagesArray: number[] = Array(colors?.total_pages)
    .fill(null)
    .map((_, index) => index + 1);

  const nav = (
    <nav>
      <button onClick={firstPage} disabled={isPreviousData || page === 1}>
        ←
      </button>
      {pagesArray.map((pageNum) => (
        <PageButton key={pageNum} pageNum={pageNum} setPage={setPage} />
      ))}
      <button
        onClick={lastPage}
        disabled={isPreviousData || page === colors?.total_pages}
      >
        →
      </button>
    </nav>
  );

  return (
    <>
      {isFetching && <span>Loading...</span>}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {content}
      </div>
      {nav}
      <Pagination />
    </>
  );
}

export default App;
