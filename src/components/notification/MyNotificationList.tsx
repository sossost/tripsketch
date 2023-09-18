import { useCallback } from "react";
import { useGetNotifications } from "../../hooks/useNotificationQuery";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { Notification } from "../../types/Notification";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../react-query/queryKey";

import NotificationItem from "./NotificationItem";

/**
 * @description : 알림 리스트 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-18,
 * @version 1.1.0, 무한 스크롤 끝에 알림 없음 메시지 추가
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

  const renderFooter = () => {
    if (!hasNextPage) {
      return (
        <View style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}>
          <Text>더 이상 알림이 없습니다.</Text>
        </View>
      );
    }
    return null;
  };

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
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        ListFooterComponent={renderFooter}
      />
    </>
  );
};

export default MyNotificationList;
