import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/queryKey";
import { Post } from "../types/Post";
import { getPostsByNickname } from "../services/post";

export const useGetPostsByNickname = (nickname: string, category: string) => {
  const fallback: Post[] = [];

  const {
    data = fallback as Post[],
    isLoading,
    isError,
  } = useQuery<Post[] | undefined>([QUERY_KEY.POSTS, nickname, category], () =>
    getPostsByNickname(nickname, category)
  );

  return { data, isLoading, isError };
};
