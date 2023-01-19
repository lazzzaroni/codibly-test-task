import { Data } from "../interfaces";

export const ColorOfTheYear = ({ color }: { color: Data }) => {
  return (
    <article
      style={{
        background: `${color.color}`,
        height: "10rem",
        width: "10rem",
        margin: "1rem",
      }}
    >
      <p>{color.id}</p>
      <p>{color.name}</p>
      <p>{color.year}</p>
    </article>
  );
};

export default ColorOfTheYear;
