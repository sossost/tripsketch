import axiosBase from "./axios";

import { errorLoging } from "../utils/errorHandler";
import { Category } from "../types/category";

/**
 * @description : 닉네임으로 해당 유저의 카테고리 리스트를 요청하는 함수
 * @param nickname : 유저닉네임
 * @update : 2023-09-12,
 * @version 1.1.0, 에러 로깅 추가
 * @see None,
 */

export const getCategoriesByNickname = async (nickname: string | undefined) => {
  if (!nickname) return;

  try {
    const response = await axiosBase.get(
      `trip/nickname/trips/country-frequencies?nickname=${nickname}`
    );
    return response.data as Category[];
  } catch (error: unknown) {
    errorLoging(error, "카테고리 리스트 요청 에러는🤔");
  }
};
