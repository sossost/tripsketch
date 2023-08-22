import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants";
import { Post } from "../types/Post";
import { getDiariesByCategory } from "../services/diary";

export const useGetDiariesByCategory = (nickname: string, category: string) => {
  if (!nickname) return;

  const fallback: Post[] = [];

  const {
    data = fallback as Post[],
    isLoading,
    isError,
  } = useQuery<Post[] | undefined>([queryKeys.diaries, category], () =>
    getDiariesByCategory(nickname, category)
  );

  return { data, isLoading, isError };
};
