import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/queryKey";
import { deleteNotification, getNotifications } from "../services/notification";
import { NotificationResponse } from "../types/Notification";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/message";
import { errorLoging } from "../utils/errorHandler";

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
  const postsPerPage = 10;
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEY.NOTIFICATIONS],
    ({ pageParam = 0 }) => {
      return getNotifications(pageParam, postsPerPage);
    },
    {
      getNextPageParam: (lastPage: NotificationResponse | undefined) => {
        if (!lastPage) return undefined;
        if (lastPage.totalPage === 0) return undefined;
        if (lastPage.totalPage === lastPage.currentPage) return undefined;

        return lastPage.currentPage;
      },
    }
  );

  const notifications =
    data?.pages.flatMap((page) => page?.notifications) || [];

  return { notifications, fetchNextPage, hasNextPage };
};

/**
 * @description : 알림 삭제를 위한 리액트 쿼리 커스텀 훅
 *
 * @author : 장윤수
 * @update : 2023-09-19,
 * @version 1.0.0,
 * @see None,
 */
export const useDeleteNotificationQuery = () => {
  const queryClient = useQueryClient();

  /** 리액트 쿼리 뮤테이션 */
  const mutation = useMutation((id: string) => deleteNotification(id), {
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: SUCCESS_MESSAGE.DELETE_NOTIFICATION,
      });

      queryClient.invalidateQueries([QUERY_KEY.NOTIFICATIONS]);
    },
    onError: (error) => {
      errorLoging(error, "알림 삭제 에러는");
      Toast.show({ type: "error", text1: ERROR_MESSAGE.DELETE_NOTIFICATION });
    },
  });

  const handleDeleteNotification = (id: string) => {
    mutation.mutate(id);
  };

  return handleDeleteNotification;
};
