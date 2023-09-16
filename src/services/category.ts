import axiosBase from "./axios";

import { Category } from "../types/category";

/**
 * @description : 닉네임으로 해당 유저의 카테고리 리스트를 요청하는 함수
 * @param nickname : 유저닉네임
 * @update : 2023-09-12,
 * @version 1.1.2, try-catch -> 에러바운더리 변경
 * @see None,
 */

export const getCategoriesByNickname = async (nickname: string) => {
  const response = await axiosBase.get(
    `trip/nickname/trips/country-frequencies?nickname=${nickname}`
  );
  return response.data as Category[];
};
