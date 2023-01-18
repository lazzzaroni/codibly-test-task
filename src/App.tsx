import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

interface Data {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

function App() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://reqres.in/api/products");
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Render data</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
