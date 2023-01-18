const ColorOfTheYear = ({ color }: any) => {
  return (
    <div
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
    </div>
  );
};

export default ColorOfTheYear;
