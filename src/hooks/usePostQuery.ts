import { QUERY_KEY } from "../react-query/queryKey";
import {
  getPostsByNickname,
  getPostsById,
  postLike,
  postUnlike,
} from "../services/post";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Post } from "../types/Post";

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

export const useGetPostsById = (id: string) => {
  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery<Post | undefined>(["postId", id], () => getPostsById(id));

  return { postData, isLoading, isError };
};

export const usePostLike = () => {
  return useMutation(postLike);
};

export const usePostUnlike = () => {
  return useMutation(postUnlike);
};
