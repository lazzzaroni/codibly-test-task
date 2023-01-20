import { useState } from "react";
import { useQuery } from "react-query";

import { getProductsPage } from "./api";
import { ColorOfTheYear, Pagination, Table } from "./components";
import { Data, ProductsPage } from "./interfaces";

import "./App.css";

const PER_PAGE = 5;

function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");

  const {
    isLoading,
    isError,
    error,
    data: colors = {} as ProductsPage,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["/products", page, searchParam],
    () => getProductsPage(page, PER_PAGE, searchParam),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <p>Loading Colors...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  const content = Array.isArray(colors.data) ? (
    colors.data.map((color: Data) => (
      // TODO: table instead of article
      <ColorOfTheYear key={color.id} color={color} />
    ))
  ) : (
    <ColorOfTheYear color={colors.data} />
  );

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  const nav = (
    <nav>
      <button onClick={prevPage} disabled={isPreviousData || page === 1}>
        ←
      </button>
      <button
        onClick={nextPage}
        disabled={isPreviousData || page === colors.total_pages}
      >
        →
      </button>
    </nav>
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchParam(search);
        }}
      >
        <input
          type="number"
          name="id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* TODO: put loading and content in a container */}
      {isFetching ? (
        <span>Loading...</span>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {content}
        </div>
      )}

      {nav}
      <Pagination />
    </>
  );
}

export default App;
