import { atom, selector } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: localStorage.getItem("token"),
});

export const isAuthorizedSelector = selector({
  key: "isAuthorizedSelector",
  get: ({ get }) => {
    return get(tokenState) != null;
  },
});
