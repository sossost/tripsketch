import { styled } from "styled-components/native";
import { colors } from "../../constants/color";
import { Notification } from "../../types/Notification";
import useTimeAgo from "../../hooks/useTimeAgo";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import { LINK } from "../../constants/link";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface NotificationProps {
  notification: Notification;
}

/**
 * @description : 소셜 아이템 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.0.1, 파일 이름 통일
 * @see None,
 */
const NotificationItem = ({ notification }: NotificationProps) => {
  const navigation = useNavigation<StackNavigation>();

  const {
    id,
    profileUrl,
    title,
    body,
    createdAt,
    nickname,
    commentId,
    tripId,
  } = notification;

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

  const renderRightActions = (dragX: any) => {
    // 스와이프로 나타날 왼쪽 액션을 렌더링하는 함수
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
    });

    const handleDelete = () => {
      // 삭제 핸들러 호출
      // onDelete(notification.id); // 또는 삭제할 항목의 ID를 전달하는 방법에 따라 다름
      console.log("notification.id", id);
    };

    return (
      <TouchableOpacity onPress={handleDelete}>
        <View
          style={{
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: "100%",
            borderRadius: 10,
          }}
        >
          <Animated.Text
            style={{
              color: "white",
              transform: [{ translateX: trans }],
            }}
          >
            삭제
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={(dragX) => renderRightActions(dragX)}>
        <View style={{ paddingVertical: 2, paddingHorizontal: 1 }}>
          <Container onPress={handlePress}>
            <ProfileImageWrapper>
              <ProfileImage source={{ uri: profileUrl }} />
            </ProfileImageWrapper>

            <TextContainer>
              <NotDescript numberOfLines={1} ellipsizeMode="tail">
                <HighLight>{seperatedBody[0]}</HighLight>님{seperatedBody[1]}
              </NotDescript>

              <NotContent>{title}</NotContent>

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

// border-bottom-width: 1px; /* 아래 선 두께 설정 */
//   border-bottom-color: #f2f2f2; /* 아래 선 색상 설정 */

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: ${SCREEN_WIDTH - 46}px;
  padding: 10px 10px 25px;
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
  font-weight: bold;
  font-size: 15px;
  letter-spacing: -0.5px;
  margin-bottom: 3px;
`;

const NotContent = styled.Text`
  font-size: 14px;
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
  font-size: 13px;
  color: ${colors.subFont};
`;

export default NotificationItem;
