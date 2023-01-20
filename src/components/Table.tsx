import { Data, ProductsPage } from "../interfaces";

export const Table = ({ color }: { color: ProductsPage }) => {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Year</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(color.data) ? (
          color.data.map((item) => <Item key={item.id} item={item} />)
        ) : (
          <Item item={color.data} />
        )}
      </tbody>
    </table>
  );
};

const Item = ({ item }: { item: Data }) => {
  return (
    <tr key={item.id} style={{ background: `${item.color}` }}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.year}</td>
    </tr>
  );
};

export default Table;
