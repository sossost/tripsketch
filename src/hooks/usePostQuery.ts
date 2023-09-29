import { QUERY_KEY } from "../react-query/queryKey";
import {
  getPostsByNickname,
  getPostsById,
  getPostsAndComments,
  getPostsAndCommentsForGuest,
  getUpdatePost,
  getLikesList,
  createPost,
  postLike,
  postUpdate,
  deletePostById,
} from "../services/post";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Post, GetPost, PostUpdate, PostLike } from "../types/Post";
import { getRequest } from "@services/utils/request";

export interface TripsData {
  trips: Post[];
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
}

export interface InfinitePostsData {
  pages: TripsData[];
  pageParams: number[];
}

const sortingType = {
  최신순: 1,
  조회수순: 2,
  인기순: 3,
  오래된순: -1,
};

/**
 * @description : 닉네임과 카테고리로 페이지네이션 처리된 게시글 리스트를 요청하는 리액트 쿼리 훅
 *
 * @param nickname : 유저닉네임
 * @param category : 카테고리
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.1.2,
 * @see None,
 */
export const useGetPostsByNickname = (nickname: string, category: string) => {
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
      getNextPageParam: (lastPage: TripsData | undefined) => {
        if (!lastPage) return undefined;
        if (lastPage.totalPages === 1) return undefined;
        if (lastPage.totalPages === lastPage.currentPage) return undefined;

        return lastPage.currentPage + 1;
      },
    }
  );
  const posts = data?.pages.flatMap((page) => page!.trips) || [];

  return { posts, fetchNextPage, hasNextPage, postsIsLoading, postsIsError };
};

/**
 * @description : 구독한 유저들을 기준으로 페이지네이션 처리된 게시글 리스트를 요청하는 리액트 쿼리 훅
 * @author : 장윤수
 * @update : 2023-09-25,
 * @version 1.0.1, getRequest 함수로 변경,
 * @see None,
 */
export const useGetSubscribedUsersPosts = () => {
  const postsPerPage = 5;
  const {
    data = null,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [QUERY_KEY.POSTS, QUERY_KEY.SUBSCRIPTED_USERS],
    ({ pageParam = 1 }) =>
      getRequest(`trip/list/following?page=${pageParam}&size=${postsPerPage}`),
    {
      getNextPageParam: (lastPage: TripsData | undefined) => {
        if (!lastPage) return undefined;
        if (lastPage.totalPages === 0) return undefined;
        if (lastPage.totalPages === lastPage.currentPage) return undefined;

        return lastPage.currentPage + 1;
      },
    }
  );

  const posts = data?.pages.flatMap((page) => page!.trips) || [];

  return { posts, fetchNextPage, hasNextPage };
};

/**
 * @description : 검색어를 바탕으로 정렬 및 페이지네이션 처리된 게시글 리스트를 요청하는 리액트 쿼리 훅
 * @author : 장윤수
 * @update : 2023-09-25,
 * @version 1.0.0, getRequest 함수로 변경,
 * @see None,
 */
export const useGetPostsBySearchQuery = (
  searchQuery: string,
  variant: "인기순" | "최신순"
) => {
  const postsPerPage = 10;

  const {
    data = null,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [QUERY_KEY.POSTS, searchQuery, variant],
    ({ pageParam = 1 }) => {
      return getRequest(
        `trip/guest/search?keyword=${searchQuery}&page=${pageParam}&size=${postsPerPage}&sort_type=${sortingType[variant]}`
      );
    },
    {
      getNextPageParam: (lastPage: TripsData | undefined) => {
        if (!lastPage) return undefined;
        if (lastPage.totalPages === 0) return undefined;
        if (lastPage.totalPages === lastPage.currentPage) return undefined;

        return lastPage.currentPage + 1;
      },
    }
  );

  const posts = data?.pages.flatMap((page) => page!.trips) || [];

  return { posts, fetchNextPage, hasNextPage };
};

/**
 * @description : 인기 게시글 리스트를 요청하는 리액트 쿼리 훅
 * @author : 장윤수
 * @update : 2023-09-25,
 * @version 1.0.0, getRequest 함수로 변경,
 * @see None,
 */
export const useGetPostsByTrendingQuery = () => {
  const postsPerPage = 5;

  const {
    data = null,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [QUERY_KEY.POSTS, QUERY_KEY.TRENDING],
    ({ pageParam = 1 }) =>
      getRequest(
        `trip/guest/trips?page=${pageParam}&size=${postsPerPage}&sortType=2`
      ),
    {
      getNextPageParam: (lastPage: TripsData | undefined) => {
        if (!lastPage) return undefined;
        if (lastPage.totalPages === 0) return undefined;
        if (lastPage.totalPages === lastPage.currentPage) return undefined;

        return lastPage.currentPage + 1;
      },
    }
  );

  const posts = data?.pages.flatMap((page) => page!.trips) || [];

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

export const useGetPostAndComments = (postId: string) => {
  const {
    data: postAndCommentData,
    isLoading: isDataUserLoading,
    isError: isDataUserError,
  } = useQuery<GetPost | null>(
    ["postAndComment", postId],
    () => getPostsAndComments(postId),
    {
      suspense: false,
      useErrorBoundary: false,
    }
  );

  return { postAndCommentData, isDataUserLoading, isDataUserError };
};

export const useGetPostAndCommentsForGuest = (postId: string) => {
  const {
    data: postAndCommentGuestData,
    isLoading: isDataGuestLoading,
    isError: isDataGuestError,
  } = useQuery<GetPost | undefined>(["postAndCommentGuest", postId], () =>
    getPostsAndCommentsForGuest(postId)
  );

  return { postAndCommentGuestData, isDataGuestLoading, isDataGuestError };
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

export const useGetLikesList = (id: string) => {
  const {
    data: likesData,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = useQuery<PostLike | undefined>(["likesData", id], () => getLikesList(id));

  return { likesData, likesIsLoading, likesIsError };
};

export const useCreatePost = () => {
  return useMutation(createPost);
};

export const usePostLike = () => {
  return useMutation(postLike);
};

export const usePostUpdate = () => {
  return useMutation(postUpdate);
};

export const usePostDelete = () => {
  return useMutation(deletePostById);
};
