import { Data } from "../interfaces";

export const ColorOfTheYear = ({ color }: { color: Data }) => {
  return (
    <table style={{ borderSpacing: "0" }}>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Year</th>
        </tr>
      </thead>
      <tbody>
        <tr
          style={{
            background: `${color.color}`,
          }}
        >
          <td>{color.id}</td>
          <td>{color.name}</td>
          <td>{color.year}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ColorOfTheYear;
