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
  deletePostById,
  getSubscribedUsersPosts,
  getSortedPostsBySearchKeyword,
  getPostsByTrending,
} from "../services/post";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Post, GetPost, PostUpdate } from "../types/Post";

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
        if (lastPage.totalPages === 0) return undefined;
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
 * @update : 2023-09-16,
 * @version 1.0.1, 쿼리 옵션 전역으로 변경
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
    ({ pageParam = 1 }) => {
      return getSubscribedUsersPosts(pageParam, postsPerPage);
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
 * @description : 검색어를 바탕으로 정렬 및 페이지네이션 처리된 게시글 리스트를 요청하는 리액트 쿼리 훅
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.0.0,
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
      return getSortedPostsBySearchKeyword(
        searchQuery,
        variant,
        pageParam,
        postsPerPage
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
 * @update : 2023-09-18,
 * @version 1.0.0,
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
    ({ pageParam = 1 }) => {
      return getPostsByTrending(pageParam, postsPerPage);
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
  } = useQuery<GetPost | undefined>(["postAndComment", postId], () =>
    getPostsAndComments(postId)
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

export const usePostDelete = () => {
  return useMutation(deletePostById);
};
