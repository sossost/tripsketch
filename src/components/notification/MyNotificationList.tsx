import { useCallback } from "react";
import { useGetNotifications } from "../../hooks/useNotificationQuery";
import { FlatList, RefreshControl, View } from "react-native";
import { Notification } from "../../types/Notification";

import NotificationItem from "./NotificationItem";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../react-query/queryKey";

/**
 * @description : 알림 리스트 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.0.0,
 * @see None,
 */
const MyNotificationList = () => {
  const queryClient = useQueryClient();
  const { notifications, fetchNextPage, hasNextPage } = useGetNotifications();

  /** 알림 리스트 무한 스크롤 핸들함수 */
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const handleRefresh = () => {
    queryClient.invalidateQueries([QUERY_KEY.NOTIFICATIONS]);
  };

  return (
    <>
      <View>
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationItem notification={item as Notification} />
          )}
          keyExtractor={(item) => (item as Notification).id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{
            gap: 10,
            paddingVertical: 20,
            paddingHorizontal: 2,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefresh} />
          }
        />
      </View>
    </>
  );
};

export default MyNotificationList;
