import React, { useState } from "react";
import { View, Modal, FlatList, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import VariantSelector from "../components/UI/VariantSelector";
import NoticePostCard from "../components/post/card/NoticePostCard";
import { Notification } from "../types/Notification";

const NotificationData: Notification[] = [
  {
    notificationId: "234", //PK
    userId: "232432", //알림을 받는 회원 PK
    targetUserId: "242351", //	해당 알림을 받게 하는 액션을 취한 회원 PK
    type: "Comment", //알림 종류 ( comment, comment_comment, notice )
    notContentId: "32423", //알림이 있게 한 글의 PK
    content: "안녕하세요..!", //알림 내용
    contentUrl: "경로", //알림 클릭시 이동할 주소
    notDateTime: "2023-05-03T17:03:43", //알림 발생 일시
    notReadDateTime: "2023-05-03T17:03:43", //알림 확인 일시
  },
  {
    notificationId: "246",
    userId: "232432",
    targetUserId: "242351",
    type: "Comment",
    notContentId: "2213",
    content:
      "으아아 ㅠㅠ!! 정말 좋아요. 정말 좋아요. 정말 좋아요~~!! 짱짱짱 좋아요",
    contentUrl: "경로",
    notDateTime: "2023-07-13T17:03:43",
    notReadDateTime: "2023-05-03T17:03:43",
  },
];

const Notice = () => {
  const [data, setData] = useState(NotificationData);
  const [variant, setVariant] = useState<"내소식" | "새소식">("내소식");

  return (
    <Container>
      <AdSection></AdSection>
      <VariantSelector
        variant1="내소식"
        variant2="새소식"
        initialVariant="내소식"
        variant={variant}
        setVariant={setVariant}
      />
      <List
        data={data}
        renderItem={({ item }) => (
          <NoticePostCard notice={item as Notification} />
        )}
        keyExtractor={(item: any) => item.notificationId}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 20,
          paddingHorizontal: 2,
        }}
      />
    </Container>
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

export default Notice;
