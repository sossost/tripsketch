import { useEffect } from "react";
import { Dimensions, Animated, Easing, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import LikesUserItem from "./components/post/LikesUserItem";
import { colors } from "@constants/color";

const Data = [
  {
    id: 123123,
    nickName: "안녕",
    imageURL: "https://source.unsplash.com/random/?user",
  },
  {
    id: 343343,
    nickName: "안녕43",
    imageURL: "https://source.unsplash.com/random/?user",
  },
  {
    id: 456433,
    nickName: "우쨜",
    imageURL: "https://source.unsplash.com/random/?user",
  },
  {
    id: 12675,
    nickName: "아이셔",
    imageURL: "https://source.unsplash.com/random/?user",
  },
  {
    id: 565332,
    nickName: "고구마짱",
    imageURL: "https://source.unsplash.com/random/?user",
  },
  {
    id: 888435,
    nickName: "감자도리",
    imageURL: "https://source.unsplash.com/random/?user",
  },
  {
    id: 127234,
    nickName: "푸딩푸푸",
    imageURL: "https://source.unsplash.com/random/?user",
  },
  {
    id: 242342,
    nickName: "햄버거못먹어",
    imageURL: "https://source.unsplash.com/random/?user",
  },
  {
    id: 23231,
    nickName: "이빨아파요",
    imageURL: "https://source.unsplash.com/random/?user",
  },
  {
    id: 7684564,
    nickName: "성수멋쟁이",
    imageURL: "https://source.unsplash.com/random/?user",
  },
];

const LikesListModal = ({ modalClose }: { modalClose: any }) => {
  const { height } = Dimensions.get("window");
  const overlayOpacity = new Animated.Value(0);

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
      >
        <LikesContainer height={height}>
          <CloseButton onPress={modalClose}>
            <AntDesign name="closecircleo" size={22} color="black" />
          </CloseButton>
          <TitleContainer>
            <Title>이 게시글 좋아요</Title>
            <Line />
            <LikesNum>
              현재 <PointText>{Data.length}명</PointText>의 사람들이 좋아요를
              눌렀습니다.
            </LikesNum>
          </TitleContainer>
          <ListBox>
            {Data.length > 0 ? (
              <FlatList
                data={Data}
                renderItem={({ item }) => <LikesUserItem likesData={item} />}
                keyExtractor={(item) => item.id.toString()}
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
  font-size: 16px;
  font-weight: 600;
`;

const Line = styled.Text`
  width: 100%;
  height: 1px;
  background-color: #e9e9e9;
  margin: 10px 0 4px;
`;

const LikesNum = styled.Text`
  text-align: right;
  font-size: 12px;
`;

const PointText = styled.Text`
  color: ${colors.primary};
`;

const ListBox = styled.View`
  padding: 0 0px;
`;
