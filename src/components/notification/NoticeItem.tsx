import { styled } from "styled-components/native";
import { colors } from "../../constants/color";
import { Notification } from "../../types/Notification";
import useTimeAgo from "../../hooks/useTimeAgo";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import { LINK } from "../../constants/link";

interface NotificationProps {
  notification: Notification;
}

/**
 * @description : 소셜 아이템 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.0.0, 로그인 유저정보 로딩시 로딩 컴포넌트 추가
 * @see None,
 */
const NoticeItem = ({ notification }: NotificationProps) => {
  const navigation = useNavigation<StackNavigation>();

  const { profileUrl, title, body, createdAt, nickname, commentId, tripId } =
    notification;

  const timeAgo = useTimeAgo(createdAt);

  const seperatedBody = body.split("님");

  /** 알림 클릭 핸들러 */
  const handlePress = () => {
    // 알림에 댓글 아이디가 있으면 해당 댓글로 이동
    if (commentId !== null) {
      navigation.navigate(LINK.TRIP_DETAIL_PAGE, { postId: tripId });
      return;
    }

    // 알림에 게시글 아이디가 있으면 해당 게시글로 이동
    if (tripId !== null) {
      navigation.navigate(LINK.TRIP_DETAIL_PAGE, { postId: tripId });
      return;
    }

    // 그 외에는 해당 유저의 페이지로 이동
    navigation.navigate(LINK.USER_PAGE, { nickname: nickname });
  };

  return (
    <Container onPress={handlePress}>
      <ProfileImageWrapper>
        <ProfileImage source={{ uri: profileUrl }} />
      </ProfileImageWrapper>

      <TextContainer>
        <NotDescript numberOfLines={1} ellipsizeMode="tail">
          <HighLight>{seperatedBody[0]}</HighLight>
          님이 {seperatedBody[1]}
        </NotDescript>

        <NotContent>{title}</NotContent>

        <CreateNotification>
          <CreateDate>{timeAgo}</CreateDate>
        </CreateNotification>
      </TextContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 10px 25px;
  border-radius: 10px;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.25;
  elevation: 2;
  position: relative;
`;

const ProfileImageWrapper = styled.View`
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50px;
  overflow: hidden;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
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

export default NoticeItem;
