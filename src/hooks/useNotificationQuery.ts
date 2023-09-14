import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/queryKey";
import { getNotifications } from "../services/notification";
import { NotificationResponse } from "../types/Notification";

export interface InfinitePostsData {
  pages: NotificationResponse;
  pageParams: number[];
}

/**
 * @description : 닉네임으로 해당 유저의 카테고리 리스트를 요청하는 리액트 쿼리 훅
 *
 * @param nickname : 유저닉네임
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.0,
 * @see None,
 */
export const useGetNotifications = () => {
  const postsPerPage = 20;
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      [QUERY_KEY.NOTIFICATIONS],
      ({ pageParam = 0 }) => {
        return getNotifications(pageParam, postsPerPage);
      },
      {
        getNextPageParam: (lastPage: NotificationResponse | undefined) => {
          if (!lastPage) return undefined;
          if (lastPage.totalPage === 0) return undefined;
          if (lastPage.totalPage === lastPage.currentPage) return undefined;

          return lastPage.currentPage + 1;
        },
      }
    );

  const notifications =
    data?.pages.flatMap((page) => page?.notifications) || [];

  return { notifications, fetchNextPage, hasNextPage, isLoading, isError };
};
