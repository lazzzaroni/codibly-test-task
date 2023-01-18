const PageButton = ({ pg, setPage }: any) => {
  return <button onClick={() => setPage(pg)}>{pg}</button>;
};

export default PageButton;
