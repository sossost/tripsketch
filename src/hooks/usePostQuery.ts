import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants";
import { Post } from "../types/Post";
import {
  getPostsByNickname,
  getPostsById,
  postLike,
  postUnlike,
} from "../services/diary";

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
