import { PageButtonProps } from "../interfaces";

export const PageButton = ({ pageNum, setPage }: PageButtonProps) => {
  return <button onClick={() => setPage(pageNum)}>{pageNum}</button>;
};

export default PageButton;
