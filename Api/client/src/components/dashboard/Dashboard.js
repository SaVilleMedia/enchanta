import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [allSets, setAllSets] = useState([]);

  useEffect(() => {
    getAllPrintings();
  }, []);

  const getAllPrintings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://www.mtgjson.com/api/v5/AllSets.json"
      );

      if (response) {
        setAllSets(response);
      }

      setLoading(false);
      console.log("response", response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return <div>{loading ? <div>loading...</div> : null}</div>;
}
