import { useQuery } from "@tanstack/react-query";
import { getCategoriesByNickname } from "../services/category";
import { QUERY_KEY } from "../react-query/queryKey";

/**
 * @description : 닉네임으로 해당 유저의 카테고리 리스트를 요청하는 리액트 쿼리 훅
 *
 * @param nickname : 유저닉네임
 *
 * @author : 장윤수
 * @update : 2023-09-14,
 * @version 1.0.1, 폴백데이터 null 추가
 * @see None,
 */
export const useGetCategoriesByNickname = (nickname: string) => {
  const {
    data = null,
    isLoading,
    isError,
  } = useQuery(
    [QUERY_KEY.CATEGORIES, nickname],
    () => getCategoriesByNickname(nickname),
    {
      enabled: !!nickname,
      suspense: true,
      useErrorBoundary: true,
    }
  );

  return { data, isLoading, isError };
};
