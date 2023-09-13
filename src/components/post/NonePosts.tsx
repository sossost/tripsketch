import { styled } from "styled-components/native";
import { colors } from "../../constants/color";
import { View } from "react-native";

const NonePosts = () => {
  return (
    <NonePostContainer>
      <NonePostText>작성된 여행일기가 없습니다.</NonePostText>
    </NonePostContainer>
  );
};

export default NonePosts;

const NonePostContainer = styled.View`
  flex: 1;
  height: 450px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const NonePostText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.mainFont};
`;
