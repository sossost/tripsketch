import { QUERY_KEY } from "../react-query/queryKey";
import {
  getPostsByNickname,
  getPostsById,
  getPostsAndComments,
  getPostsAndCommentsForGuest,
  getUpdatePost,
  createPost,
  postLike,
  postUnlike,
  postUpdate,
} from "../services/post";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Post, GetPost, PostUpdate } from "../types/Post";

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

/**
 * @description : 닉네임과 카테고리로 페이지네이션 처리된 게시글 리스트를 요청하는 리액트 쿼리 훅
 *
 * @param nickname : 유저닉네임
 * @param category : 카테고리
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.1.1, isLoading, isError 추가
 * @see None,
 */
export const useGetPostsByNickname = (
  nickname: string | undefined,
  category: string
) => {
  const postsPerPage = 5;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: postsIsLoading,
    isError: postsIsError,
  } = useInfiniteQuery(
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

  return { posts, fetchNextPage, hasNextPage, postsIsLoading, postsIsError };
};

export const useGetPostsById = (id: string) => {
  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery<Post | undefined>(["postId", id], () => getPostsById(id));

  return { postData, isLoading, isError };
};

export const useGetPostAndComments = (postId: string) => {
  const {
    data: postAndCommentData,
    isLoading,
    isError,
  } = useQuery<GetPost | undefined>(["postAndComment", postId], () =>
    getPostsAndComments(postId)
  );

  return { postAndCommentData, isLoading, isError };
};

export const useGetPostAndCommentsForGuest = (postId: string) => {
  const {
    data: postAndCommentGuestData,
    isLoading,
    isError,
  } = useQuery<GetPost | undefined>(["postAndCommentGuest", postId], () =>
    getPostsAndCommentsForGuest(postId)
  );

  return { postAndCommentGuestData, isLoading, isError };
};

export const useGetUpdatePost = (id: string) => {
  const {
    data: updateData = {},
    isLoading: postsUpdateIsLoading,
    isError: postsUpdateIsError,
  } = useQuery<PostUpdate | undefined>(["updatePost", id], () =>
    getUpdatePost(id)
  );

  return { updateData, postsUpdateIsLoading, postsUpdateIsError };
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

export const usePostUpdate = () => {
  return useMutation(postUpdate);
};
