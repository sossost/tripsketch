import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";
import { Text, View } from "react-native";
import { Notification } from "../../../types/Notification";
import React, { useEffect, useState } from "react";

interface NotificationProps {
  notice: Notification;
}

const NoticePostCard = (props: NotificationProps) => {
  const [timeAgo, setTimeAgo] = useState("");
  const {
    notificationId,
    userId,
    targetUserId,
    type,
    notContentId,
    content,
    contentUrl,
    notDateTime,
    notReadDateTime,
  } = props.notice;

  useEffect(() => {
    const today: Date = new Date();
    const notificationDate: Date = new Date(notDateTime);

    const diffTime: number = today.getTime() - notificationDate.getTime();
    const diffInSeconds = Math.floor(diffTime / 1000);

    if (diffInSeconds < 60) {
      setTimeAgo(`${diffInSeconds}초 전`);
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      setTimeAgo(`${diffInMinutes}분 전`);
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      setTimeAgo(`${diffInHours}시간 전`);
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      setTimeAgo(`${diffInDays}일 전`);
    }
  }, [notDateTime]);

  return (
    <Container>
      <ProfileImage></ProfileImage>
      <TextContainer>
        <NotDescript numberOfLines={1} ellipsizeMode="tail">
          <HighLight>{targetUserId}</HighLight>님이 회원님 글에 댓글을
          남겼습니다.
        </NotDescript>
        <NotContent>{content}</NotContent>
        <CreateNotification>
          <CreateDate>{timeAgo}</CreateDate>
        </CreateNotification>
      </TextContainer>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 10px 25px;
  border-radius: 10px;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3;
  elevation: 2;

  position: relative;
`;

const ProfileImage = styled.View`
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50px;
`;

const TextContainer = styled.View`
  padding: 0px 10px;
  box-sizing: border-box;
  width: 90%;
`;

const NotDescript = styled.Text`
  font-weight: bold;
  font-size: 14px;
  letter-spacing: -0.5px;
`;

const NotContent = styled.Text`
  font-size: 12px;
  color: #888;
`;

const HighLight = styled.Text`
  color: ${colors.primary};
`;

const CreateNotification = styled.View`
  position: absolute;
  bottom: -15px;
  right: 15px;
`;

const CreateDate = styled.Text`
  font-size: 11px;
  color: ${colors.subFont};
`;

export default NoticePostCard;
