import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Balance() {
  const [balance, setBalance] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchbalance = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(
          "http://localhost:4000/api/v1/account/balance"
        );
        console.log("response:", response);
        setBalance(response.data.balance);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchbalance();
  }, [token]);

  return <div>Balance: {balance}</div>;
}
