import { useCallback } from "react";
import { useGetNotifications } from "../../hooks/useNotificationQuery";
import {
  Animated,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Notification } from "../../types/Notification";

import NotificationItem from "./NotificationItem";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../react-query/queryKey";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

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

  const handleDeleteNotification = (notificationId: string) => {
    // notifications 배열에서 해당 ID를 가진 항목을 제거
    const updatedNotifications = notifications.filter(
      (item) => item.id !== notificationId
    );

    // 상태 업데이트
    // 예를 들어, useState를 사용한다면 setNotifications(updatedNotifications) 등으로 업데이트
  };

  const handleDelete = () => {
    // 삭제 핸들러
    // onDelete(id);
    console.log("삭제@@");
  };

  const renderRightActions = (dragX: any) => {
    // 스와이프로 나타날 왼쪽 액션을 렌더링하는 함수
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <TouchableOpacity onPress={handleDelete}>
        <View
          style={{
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: "100%",
          }}
        >
          <Animated.Text
            style={{
              color: "white",
              transform: [{ translateX: trans }],
            }}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={notifications}
        renderItem={({ item, index }) => (
          <GestureHandlerRootView>
            <Swipeable
              renderRightActions={(dragX) => renderRightActions(dragX)}
            >
              <NotificationItem
                notification={item as Notification}
                // onDelete={handleDeleteNotification}
              />
            </Swipeable>
          </GestureHandlerRootView>
        )}
        keyExtractor={(item) => (item as Notification).id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          gap: 15,
          paddingVertical: 20,
          paddingHorizontal: 2,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
      />
    </>
  );
};

export default MyNotificationList;
