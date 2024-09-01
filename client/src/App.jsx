import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.shortUrls);
    setArray(response.data.shortUrls);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div>
        save some space.
      </div>
    </>
  );
}

export default App;
