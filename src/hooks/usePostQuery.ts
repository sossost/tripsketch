import { QUERY_KEY } from "../react-query/queryKey";
import {
  getPostsByNickname,
  getPostsById,
  createPost,
  postLike,
  postUnlike,
} from "../services/post";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Post } from "../types/Post";

export interface PostsData {
  posts: Post[];
  currentPage: number;
  totalPage: number;
  postsPerPage: number;
}

export interface InfinitePostsData {
  pages: PostsData;
  pageParams: number[];
}

export const useGetPostsByNickname = (nickname: string, category: string) => {
  const postsPerPage = 5;
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEY.POSTS, nickname, category],
    ({ pageParam = 1 }) => {
      return getPostsByNickname(nickname, category, pageParam, postsPerPage);
    },
    {
      enabled: !!nickname,
      getNextPageParam: (lastPage: PostsData | undefined) => {
        if (!lastPage) return undefined;
        if (lastPage.totalPage === 0) return undefined;
        if (lastPage.totalPage === lastPage.currentPage) return undefined;

        return lastPage.currentPage + 1;
      },
    }
  );

  const posts = data?.pages.flatMap((page) => page?.posts) || [];

  return { posts, fetchNextPage, hasNextPage };
};

export const useGetPostsById = (id: string) => {
  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery<Post | undefined>(["postId", id], () => getPostsById(id));

  return { postData, isLoading, isError };
};

export const useCreatePost = () => {
  return useMutation(createPost);
};

export const usePostLike = () => {
  return useMutation(postLike);
};

export const usePostUnlike = () => {
  return useMutation(postUnlike);
};
