import { atom } from "recoil";

export const categoryState = atom<string>({
  key: "categoryAtom",
  default: "전체보기",
});
