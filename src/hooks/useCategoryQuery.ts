import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/queryKey";
import { getRequest } from "@services/utils/request";
import { API_PATH } from "@constants/path";

/**
 * @description : 닉네임으로 해당 유저의 카테고리 리스트를 요청하는 리액트 쿼리 훅
 *
 * @param nickname : 유저닉네임
 *
 * @author : 장윤수
 * @update : 2023-09-16,
 * @version 1.1.1, try-catch -> 에러바운더리 변경
 * @see None,
 */
export const useGetCategoriesByNickname = (nickname: string) => {
  const {
    data = null,
    isLoading,
    isError,
  } = useQuery(
    [QUERY_KEY.CATEGORIES, nickname],
    () => getRequest(API_PATH.CATEGORY.GET.BY_NICKNAME(nickname)),
    {
      enabled: !!nickname,
    }
  );

  return { data, isLoading, isError };
};
