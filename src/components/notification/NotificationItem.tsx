import { styled } from "styled-components/native";
import { colors } from "../../constants/color";
import { Notification } from "../../types/Notification";
import useTimeAgo from "../../hooks/useTimeAgo";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import { LINK } from "../../constants/link";
import { View, Dimensions } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import { useDeleteNotificationQuery } from "../../hooks/useNotificationQuery";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import NotificationDeleteBtn from "./NotificationDeleteBtn";

interface NotificationProps {
  notification: Notification;
}

/**
 * @description : 소셜 아이템 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-19,
 * @version 1.0.3, 알림 내용 부분 1줄 넘어가면 ... 처리
 * @see None,
 */
const NotificationItem = ({ notification }: NotificationProps) => {
  const navigation = useNavigation<StackNavigation>();

  const handleDeleteNotification = useDeleteNotificationQuery();

  const {
    id,
    profileUrl,
    content,
    body,
    createdAt,
    nickname,
    commentId,
    tripId,
  } = notification;

  // 상대 시간 변환
  const timeAgo = useTimeAgo(createdAt);

  // 알림 내용에서 닉네임 뒤에 오는 내용만 추출
  const basisIndex = body.indexOf("님");
  const seperatedBody = body.slice(basisIndex + 1);

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
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={(dragX) => (
          <NotificationDeleteBtn
            dragX={dragX}
            onClick={() => handleDeleteNotification(id)}
          />
        )}
      >
        <View style={{ paddingVertical: 2, paddingHorizontal: 1 }}>
          <Container onPress={handlePress}>
            <ProfileImageWrapper>
              <ProfileImage source={{ uri: profileUrl }} />
            </ProfileImageWrapper>

            <TextContainer>
              <NotDescript numberOfLines={1} ellipsizeMode="tail">
                <HighLight>{nickname}</HighLight>님{seperatedBody}
              </NotDescript>

              <NotContent numberOfLines={1} ellipsizeMode="tail">
                {content}
              </NotContent>

              <CreateNotification>
                <CreateDate>{timeAgo}</CreateDate>
              </CreateNotification>
            </TextContainer>
          </Container>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: ${SCREEN_WIDTH - 46}px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  shadow-offset: 0px 0px;
  elevation: 1;
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
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.5px;
  margin-bottom: 3px;
  color: ${colors.mainFont};
`;

const NotContent = styled.Text`
  font-size: 14px;
  color: ${colors.subFont};
  font-weight: 400;
  width: 80%;
`;

const HighLight = styled.Text`
  color: ${colors.primary};
`;

const CreateNotification = styled.View`
  position: absolute;
  bottom: 0;
  right: 10px;
`;

const CreateDate = styled.Text`
  font-size: 13px;
  color: ${colors.subFont};
`;

export default NotificationItem;
