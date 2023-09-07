import { useQuery } from "@tanstack/react-query";
import { getCategoriesByNickname } from "../services/category";
import { QUERY_KEY } from "../react-query/queryKey";

export const useGetCategoriesByNickname = (nickname: string) => {
  const { data, isLoading, isError } = useQuery(
    [QUERY_KEY.CATEGORIES, nickname],
    () => getCategoriesByNickname(nickname)
  );

  return { data, isLoading, isError };
};
