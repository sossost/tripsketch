import { useCallback, useState } from "react";
import styled from "styled-components/native";
import VariantSelector from "../UI/VariantSelector";
import { useGetNotifications } from "../../hooks/useNotificationQuery";
import { Notification } from "../../types/Notification";

import NoticeItem from "./NoticeItem";
import Loading from "../UI/Loading";
import NoneData from "../UI/NoneData";
import Header from "../UI/header/Header";
import Title from "../UI/header/Title";

/**
 * @description : 알림 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-14,
 * @version 1.0.0,
 * @see None,
 */
const NotificationPageComponent = () => {
  const [variant, setVariant] = useState<"내소식" | "새소식">("내소식");
  // 추후에 새소식 구현

  const { notifications, fetchNextPage, hasNextPage, isLoading } =
    useGetNotifications();

  /** 알림 리스트 무한 스크롤 핸들함수 */
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <Header left={<Title title={"알림"} />} />
      <Container>
        <AdSection></AdSection>
        <VariantSelector
          variant1="내소식"
          variant2="새소식"
          initialVariant="내소식"
          variant={variant}
          setVariant={setVariant}
        />
        {isLoading && <Loading />}
        {notifications.length === 0 && !isLoading && (
          <NoneData message="받은 알림이 없습니다." />
        )}
        <List
          data={notifications}
          renderItem={({ item }) => (
            <NoticeItem notification={item as Notification} />
          )}
          keyExtractor={(item) => (item as Notification).id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{
            gap: 10,
            paddingVertical: 20,
            paddingHorizontal: 2,
          }}
        />
      </Container>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
`;

const AdSection = styled.View`
  width: 100%;
  height: 80px;
  background: #eee;
  border-radius: 5px;
`;
const List = styled.FlatList`
  width: 100%;
`;

export default NotificationPageComponent;
