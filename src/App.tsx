import { useState } from "react";
import { useQuery } from "react-query";
import { getProductsPage } from "./api/axios";

import ColorOfTheYear from "./components/ColorOfTheYear";
import PageButton from "./components/PageButton";

import "./App.css";

export interface Data {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

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

  const content = colors.data.map((color: any) => (
    <ColorOfTheYear key={color.id} color={color} />
  ));

  const lastPage = () => setPage(colors.total_pages);

  const firstPage = () => setPage(1);

  const pagesArray = Array(colors.total_pages)
    .fill(null)
    .map((_, index) => index + 1);

  const nav = (
    <nav>
      <button onClick={firstPage} disabled={isPreviousData || page === 1}>
        &lt;&lt;
      </button>
      {/* Removed isPreviousData from PageButton to keep button focus color instead */}
      {pagesArray.map((pg) => (
        <PageButton key={pg} pg={pg} setPage={setPage} />
      ))}
      <button
        onClick={lastPage}
        disabled={isPreviousData || page === colors.total_pages}
      >
        &gt;&gt;
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
    </>
  );
}

export default App;
