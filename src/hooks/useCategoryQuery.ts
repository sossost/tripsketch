import { useQuery } from "@tanstack/react-query";
import { getCategoriesByNickname } from "../services/category";
import { QUERY_KEY } from "../react-query/queryKey";

/**
 * @description : 닉네임으로 해당 유저의 카테고리 리스트를 요청하는 리액트 쿼리 훅
 *
 * @param nickname : 유저닉네임
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.0,
 * @see None,
 */
export const useGetCategoriesByNickname = (nickname: string | undefined) => {
  const { data, isLoading, isError } = useQuery(
    [QUERY_KEY.CATEGORIES, nickname],
    () => getCategoriesByNickname(nickname),
    {
      enabled: !!nickname,
    }
  );

  return { data, isLoading, isError };
};
