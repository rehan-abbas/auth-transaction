import { selector } from "recoil";
import axios from "axios";

export const balanceDetails = selector({
  key: "balanceDetailsSelector",
  get: async ({ get }) => {
    const balance = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    return balance;
  },
});


