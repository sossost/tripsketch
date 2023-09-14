import { styled } from "styled-components/native";
import { colors } from "../../constants/color";

/**
 * @description : 플랫리스트 내에서 포스트 데이터 없을시 띄워줄 컴포넌트

 *
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.0.0, 
 * @see None,
 */
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
