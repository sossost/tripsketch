import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/queryKey";
import { getNotifications } from "../services/notification";
import { NotificationResponse } from "../types/Notification";

export interface InfinitePostsData {
  pages: NotificationResponse;
  pageParams: number[];
}

/**
 * @description : 내 알림 리스트를 가져오는 커스텀 훅
 *
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.0.1,
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
