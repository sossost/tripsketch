import { useEffect } from "react";
import { Dimensions, Animated, Easing, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import LikesUserItem from "./components/post/LikesUserItem";
import { colors } from "@constants/color";
import { useGetLikesList } from "@hooks/usePostQuery";

type LikesModalProps = {
  modalClose: () => void;
  postId: string;
};

const LikesListModal = ({ modalClose, postId }: LikesModalProps) => {
  const { height } = Dimensions.get("window");
  const overlayOpacity = new Animated.Value(0);

  // 좋아요한 유저 데이터 조회
  const { likesData } = useGetLikesList(postId);

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Container>
      <Overlay style={{ opacity: overlayOpacity }}></Overlay>
      <ModalContainer
        animationType="slide"
        transparent={true}
        visible={true}
        height={height}
        onRequestClose={modalClose}
      >
        <LikesContainer height={height}>
          <CloseButton onPress={modalClose}>
            <AntDesign name="closecircleo" size={22} color="black" />
          </CloseButton>
          <TitleContainer>
            <Title>이 게시글 좋아요</Title>
            <Line />
            <LikesNum>
              <Ionicons name={"md-heart-sharp"} size={13} color={"#ec6565"} />
              현재 <PointText>{likesData?.tripLikesInfo.length}명</PointText>의
              사람들이 좋아요를 눌렀습니다.
            </LikesNum>
          </TitleContainer>
          <ListBox>
            {likesData?.tripLikesInfo && likesData?.tripLikesInfo.length > 0 ? (
              <FlatList
                data={likesData?.tripLikesInfo}
                renderItem={({ item }) => (
                  <LikesUserItem likesData={item} modalClose={modalClose} />
                )}
                keyExtractor={(_, index) => index.toString()}
              />
            ) : null}
          </ListBox>
        </LikesContainer>
      </ModalContainer>
    </Container>
  );
};

export default LikesListModal;

const Container = styled.View`
  width: 100%;
`;

const ModalContainer = styled.Modal<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height}px;
  background-image: #fff;
`;

const Overlay = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
  top: 0;
  z-index: 4;
`;

const CloseButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;

  position: absolute;
  z-index: 5;
  top: 15px;
  right: 20px;
`;

const LikesContainer = styled.View<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height * 0.9}px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  z-index: 4;
  border-radius: 7px 7px 0px 0px;
`;

const TitleContainer = styled.View`
  padding: 25px 20px;
`;

const Title = styled.Text`
  font-size: 17px;
  font-weight: 600;
`;

const Line = styled.Text`
  width: 100%;
  height: 1px;
  background-color: #e9e9e9;
  ${Platform.OS === "ios" ? "margin: 10px 0 7px;" : "margin: 10px 0 4px;"};
`;

const LikesNum = styled.Text`
  text-align: right;
  color: ${colors.subFont};
  ${Platform.OS === "ios" ? "font-size: 14px;" : "font-size: 13px;"};
`;

const PointText = styled.Text`
  color: ${colors.primary};
`;

const ListBox = styled.View`
  padding: 0 0px;
`;
