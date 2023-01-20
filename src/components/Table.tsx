import { useState } from "react";
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
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <tr
        onClick={() => setOpenModal(true)}
        key={item.id}
        style={{ background: `${item.color}` }}
      >
        <td>{item.id}</td>
        <td>
          {item.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          )}
        </td>
        <td>{item.year}</td>
      </tr>
      {openModal && <Modal item={item} setOpenModal={setOpenModal} />}
    </>
  );
};

const Modal = ({
  item,
  setOpenModal,
}: {
  item: Data;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div
          className="modalColorBox"
          style={{ background: `${item.color}`, color: "#fff" }}
        >
          <h2>Color Of The Year</h2>
          <h1>{item.year}</h1>
        </div>
        <div className="modalDescription">
          <p>Pantone {item.pantone_value}</p>
          <p>
            {item.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
              letter.toUpperCase()
            )}
          </p>
          <button
            className="modalCloseButton"
            onClick={() => setOpenModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
