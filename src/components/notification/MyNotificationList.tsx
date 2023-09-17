import { useCallback } from "react";
import { useGetNotifications } from "../../hooks/useNotificationQuery";
import { FlatList } from "react-native";
import { Notification } from "../../types/Notification";

import NotificationItem from "./NotificationItem";

/**
 * @description : 알림 리스트 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.0.0,
 * @see None,
 */
const MyNotificationList = () => {
  const { notifications, fetchNextPage, hasNextPage } = useGetNotifications();

  /** 알림 리스트 무한 스크롤 핸들함수 */
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
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
      />
    </>
  );
};

export default MyNotificationList;
