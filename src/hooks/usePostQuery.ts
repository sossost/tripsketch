import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants";
import { Post } from "../types/Post";
import { getPostsByNickname } from "../services/diary";

export const useGetPostsByNickname = (nickname: string, category: string) => {
  const fallback: Post[] = [];

  const {
    data = fallback as Post[],
    isLoading,
    isError,
  } = useQuery<Post[] | undefined>([queryKeys.posts, nickname, category], () =>
    getPostsByNickname(nickname, category)
  );

  return { data, isLoading, isError };
};
