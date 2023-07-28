import { atom } from "recoil";

/** 토큰 상태를 Recoil atom으로 정의 */
export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});
